export const BlogPostSummariesGrid = (p: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {p.children}
    </div>
  );
};
