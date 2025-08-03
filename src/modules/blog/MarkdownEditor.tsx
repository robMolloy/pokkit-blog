import { CustomIcon } from "@/components/CustomIcon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useRef, useState } from "react";
import { DisplayMarkdown } from "./DisplayMarkdown";

const initText = `heading 
    
hiya mate \`hrllo one\`
    
[here is a link to google.com](google.com)
![here is a photo](http://localhost:3000/test.png)
    
two three world`;

export const MarkdownEditor = () => {
  const [text, setText] = useState(initText);
  const [cursorSelectionStart, setCursorSelectionStart] = useState(0);
  const [cursorSelectionEnd, setCursorSelectionEnd] = useState(0);
  const textareaElmRef = useRef<HTMLTextAreaElement>(null);

  const handleCursorMove = (e: FormEvent<HTMLTextAreaElement>) => {
    setCursorSelectionStart(e.currentTarget.selectionStart);
    setCursorSelectionEnd(e.currentTarget.selectionEnd);
  };

  const focusCursor = (p: { newSelectionStart: number; newSelectionEnd: number }) => {
    setTimeout(() => {
      if (!textareaElmRef.current) return;
      textareaElmRef.current.focus();
      textareaElmRef.current.selectionStart = p.newSelectionStart;
      textareaElmRef.current.selectionEnd = p.newSelectionEnd;
    }, 50);
  };

  const wrapTags = (p: { tagOpen: string; tagClose: string }) => {
    const tagOpen = p.tagOpen;
    const tagClose = p.tagClose;

    const textBefore = text.substring(0, cursorSelectionStart);
    const textHighlighted = text.substring(cursorSelectionStart, cursorSelectionEnd);
    const textAfter = text.substring(cursorSelectionEnd);

    const tagOpensInTextBefore = textBefore.split(tagOpen).length - 1;
    const tagClosesInTextBefore = textBefore.split(tagClose).length - 1;

    const isDirectlyInsideTag =
      textBefore.slice(0 - tagOpen.length) === tagOpen &&
      textAfter.slice(0, tagClose.length) === tagClose;

    const isOpenTags = tagOpensInTextBefore === tagClosesInTextBefore;

    const resp = (() => {
      if (isDirectlyInsideTag) {
        setText(
          `${textBefore.slice(0, -tagOpen.length)}${textHighlighted}${textAfter.slice(tagClose.length)}`,
        );

        const newSelectionStart = cursorSelectionStart - tagOpen.length;
        const newSelectionEnd = cursorSelectionEnd - tagOpen.length;
        return { newSelectionStart, newSelectionEnd };
      }
      const tag1 = isOpenTags ? tagOpen : tagClose;
      const tag2 = isOpenTags ? tagClose : tagOpen;

      setText(`${textBefore}${tag1}${textHighlighted}${tag2}${textAfter}`);

      const newSelectionStart = cursorSelectionStart + tag1.length;
      const newSelectionEnd = cursorSelectionEnd + tag1.length;

      return { newSelectionStart, newSelectionEnd };
    })();
    setCursorSelectionStart(resp.newSelectionStart);
    setCursorSelectionEnd(resp.newSelectionEnd);

    focusCursor(resp);
  };

  const addTagAtStartOfLine = (p: { tag: string }) => {
    const textBefore = text.substring(0, cursorSelectionStart);
    const textAfter = text.substring(cursorSelectionStart);

    const splitTextBefore = textBefore.split("\n");

    const editedTextBefore = splitTextBefore
      .map((textLine, j) => {
        const currentCursorLine = splitTextBefore.length === j + 1;
        if (!currentCursorLine) return textLine;
        console.log(`MarkdownEditor.tsx:${/*LL*/ 89}`, { textLine });

        return textLine.startsWith(p.tag) ? textLine.slice(p.tag.length) : `${p.tag}${textLine}`;
      })
      .join("\n");

    setText(`${editedTextBefore}${textAfter}`);

    const isTagRemoved = editedTextBefore.length < textBefore.length;

    const newSelectionStart = cursorSelectionStart + p.tag.length * (isTagRemoved ? -1 : 1);
    const newSelectionEnd = cursorSelectionEnd + p.tag.length * (isTagRemoved ? -1 : 1);
    setCursorSelectionStart(newSelectionStart);
    setCursorSelectionEnd(newSelectionEnd);

    focusCursor({ newSelectionStart, newSelectionEnd });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <Button onClick={() => wrapTags({ tagOpen: "**", tagClose: "**" })}>
          <CustomIcon iconName="Bold" size="md" />
        </Button>
        <Button onClick={() => wrapTags({ tagOpen: "_", tagClose: "_" })}>
          <CustomIcon iconName="Italic" size="md" />
        </Button>
        <Button onClick={() => wrapTags({ tagOpen: "[", tagClose: "]()" })}>
          <CustomIcon iconName="Link" size="md" />
        </Button>
        <Button onClick={() => wrapTags({ tagOpen: "![", tagClose: "]()" })}>
          <CustomIcon iconName="Image" size="md" />
        </Button>
        <Button onClick={() => addTagAtStartOfLine({ tag: "# " })}>
          <CustomIcon iconName="Heading1" size="md" />
        </Button>
        <Button onClick={() => addTagAtStartOfLine({ tag: "## " })}>
          <CustomIcon iconName="Heading2" size="md" />
        </Button>
        <Button onClick={() => addTagAtStartOfLine({ tag: "### " })}>
          <CustomIcon iconName="Heading3" size="md" />
        </Button>
        {/* <Button onClick={() => wrapTags({ tagOpen: "[", tagClose: "]()" })}>
          <CustomIcon iconName="List" size="md" />
        </Button> */}
        {/* 
        // Install remark-gfm for additional control
        <Button onClick={() => addWrappingTags({ tagOpen: "~~", tagClose: "~~" })}>
          <CustomIcon iconName="Strikethrough" size="md" />
        </Button> */}
      </div>
      <Textarea
        ref={textareaElmRef}
        value={text}
        onInput={(e) => {
          setText(e.currentTarget.value);
          handleCursorMove(e);
        }}
        onKeyUp={(e) => handleCursorMove(e)}
        onClick={(e) => handleCursorMove(e)}
        onMouseUp={(e) => handleCursorMove(e)}
        className="min-h-48 font-mono text-sm"
      />

      <DisplayMarkdown>{text}</DisplayMarkdown>
    </div>
  );
};
