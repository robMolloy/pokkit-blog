import { create } from "zustand";
import { TBlogPostImageRecord } from "./dbBlogPostImageRecordUtils";

type TState = TBlogPostImageRecord[] | undefined | null;

const useInitBlogPostImageRecordsStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: undefined,
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: undefined })),
}));

export const useBlogPostImageRecordsStore = () => {
  const store = useInitBlogPostImageRecordsStore();

  return { ...store };
};
