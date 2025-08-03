import Markdown from "react-markdown";

export const DisplayMarkdown = (p: { children: string }) => {
  return (
    <div className="react-markdown">
      <Markdown>{p.children}</Markdown>
    </div>
  );
};
