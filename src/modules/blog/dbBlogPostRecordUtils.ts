import { z } from "zod";
import PocketBase from "pocketbase";

const blogPostRecordSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  id: z.string(),
  title: z.string(),
  content: z.string(),
  created: z.string(),
  updated: z.string(),
});
export type TBlogPostRecord = z.infer<typeof blogPostRecordSchema>;

const collectionName = "blogPosts";

export const createBlogPostRecord = async (p: {
  pb: PocketBase;
  data: Omit<TBlogPostRecord, "collectionId" | "collectionName" | "id" | "created" | "updated">;
}) => {
  try {
    const resp = await p.pb.collection(collectionName).create(p.data);
    return blogPostRecordSchema.safeParse(resp);
  } catch (error) {
    console.error(error);
    return { success: false, error } as const;
  }
};
export const listBlogPostRecords = async (p: { pb: PocketBase }) => {
  try {
    const initData = await p.pb.collection(collectionName).getFullList({
      sort: "-created",
    });

    const data = initData
      .map((x) => blogPostRecordSchema.safeParse(x))
      .filter((x) => x.success)
      .map((x) => x.data);
    return { success: true, data } as const;
  } catch (error) {
    return { success: false, error } as const;
  }
};

export const subscribeToBlogPostRecords = async (p: {
  pb: PocketBase;
  initData: TBlogPostRecord[];
  onChange: (x: TBlogPostRecord[]) => void;
  onError: () => void;
}) => {
  let records = [...p.initData];
  try {
    const unsub = p.pb.collection(collectionName).subscribe("*", (e) => {
      if (e.action === "create") {
        const parseResp = blogPostRecordSchema.safeParse(e.record);
        if (parseResp.success) records.push(parseResp.data);
      }
      if (e.action === "update") {
        const parseResp = blogPostRecordSchema.safeParse(e.record);
        if (!parseResp.success) return;

        records = records.filter((x) => parseResp.data?.id !== x.id);
        records.push(parseResp.data);
      }
      if (e.action === "delete") {
        const parseResp = blogPostRecordSchema.safeParse(e.record);
        if (!parseResp.success) return;

        records = records.filter((x) => parseResp.data?.id !== x.id);
      }
      p.onChange([...records]);
    });

    return { success: true, data: unsub } as const;
  } catch (error) {
    p.onError();
    return { success: false, error } as const;
  }
};

export const smartSubscribeToBlogPostRecords = async (p: {
  pb: PocketBase;
  onChange: (x: TBlogPostRecord[]) => void;
  onError: () => void;
}) => {
  const listBlogPostRecordsResp = await listBlogPostRecords(p);
  if (!listBlogPostRecordsResp.success) {
    p.onError();
    return listBlogPostRecordsResp;
  }

  let allRecords = listBlogPostRecordsResp.data;
  p.onChange(allRecords);

  const subscribeResp = await subscribeToBlogPostRecords({
    pb: p.pb,
    initData: allRecords,
    onChange: (x) => {
      allRecords = x;
      p.onChange(allRecords);
    },
    onError: p.onError,
  });

  return subscribeResp;
};
