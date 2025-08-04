import { z } from "zod";
import PocketBase from "pocketbase";

const blogPostImageRecordSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  id: z.string(),
  imageUrl: z.string(),
  created: z.string(),
  updated: z.string(),
});
export type TBlogPostImageRecord = z.infer<typeof blogPostImageRecordSchema>;

const collectionName = "blogPostImages";

export const createBlogPostImageRecord = async (p: {
  pb: PocketBase;
  data: Omit<
    TBlogPostImageRecord,
    "collectionId" | "collectionName" | "id" | "created" | "updated"
  >;
}) => {
  try {
    const resp = await p.pb.collection(collectionName).create(p.data);
    return blogPostImageRecordSchema.safeParse(resp);
  } catch (error) {
    console.error(error);
    return { success: false, error } as const;
  }
};
export const listBlogPostImageRecords = async (p: { pb: PocketBase }) => {
  try {
    const initData = await p.pb.collection(collectionName).getFullList({
      sort: "-created",
    });

    const data = initData
      .map((x) => blogPostImageRecordSchema.safeParse(x))
      .filter((x) => x.success)
      .map((x) => x.data);
    return { success: true, data } as const;
  } catch (error) {
    return { success: false, error } as const;
  }
};

export const subscribeToBlogPostImageRecords = async (p: {
  pb: PocketBase;
  initData: TBlogPostImageRecord[];
  onChange: (x: TBlogPostImageRecord[]) => void;
  onError: () => void;
}) => {
  let records = [...p.initData];
  try {
    const unsub = p.pb.collection(collectionName).subscribe("*", (e) => {
      if (e.action === "create") {
        const parseResp = blogPostImageRecordSchema.safeParse(e.record);
        if (parseResp.success) records.push(parseResp.data);
      }
      if (e.action === "update") {
        const parseResp = blogPostImageRecordSchema.safeParse(e.record);
        if (!parseResp.success) return;

        records = records.filter((x) => parseResp.data?.id !== x.id);
        records.push(parseResp.data);
      }
      if (e.action === "delete") {
        const parseResp = blogPostImageRecordSchema.safeParse(e.record);
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

export const smartSubscribeToBlogPostImageRecords = async (p: {
  pb: PocketBase;
  onChange: (x: TBlogPostImageRecord[]) => void;
  onError: () => void;
}) => {
  const listBlogPostImageRecordsResp = await listBlogPostImageRecords(p);
  if (!listBlogPostImageRecordsResp.success) {
    p.onError();
    return listBlogPostImageRecordsResp;
  }

  let allRecords = listBlogPostImageRecordsResp.data;
  p.onChange(allRecords);

  const subscribeResp = await subscribeToBlogPostImageRecords({
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
