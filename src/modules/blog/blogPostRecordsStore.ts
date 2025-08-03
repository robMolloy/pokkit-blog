import { create } from "zustand";
import { TBlogPostRecord } from "./dbBlogPostRecordUtils";

type TState = TBlogPostRecord[] | undefined | null;

const useInitBlogPostRecordsStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: undefined,
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: undefined })),
}));

export const useBlogPostRecordsStore = () => {
  const store = useInitBlogPostRecordsStore();

  return { ...store };
};
