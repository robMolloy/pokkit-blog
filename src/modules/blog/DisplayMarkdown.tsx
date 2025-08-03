import Link from "next/link";
import Markdown from "react-markdown";

export const DisplayMarkdown = (p: { children: string }) => {
  return (
    <div className="react-markdown">
      <Markdown
        components={{
          a: ({ children, href }) => {
            if (!href) return <a>{children}</a>;
            if (href?.startsWith("http"))
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );

            return <Link href={href}>{children}</Link>;
          },
        }}
      >
        {p.children}
      </Markdown>
    </div>
  );
};
