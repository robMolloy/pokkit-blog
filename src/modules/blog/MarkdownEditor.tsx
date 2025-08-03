import { CustomIcon } from "@/components/CustomIcon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useEffect, useRef, useState } from "react";

export const MarkdownEditor = (p: { value: string; onChange: (text: string) => void }) => {
  const [internalValue, setInternalValue] = useState(p.value ?? "");
  const [cursorSelectionStart, setCursorSelectionStart] = useState(0);
  const [cursorSelectionEnd, setCursorSelectionEnd] = useState(0);
  const textareaElmRef = useRef<HTMLTextAreaElement>(null);

  const handleCursorMove = (e: FormEvent<HTMLTextAreaElement>) => {
    setCursorSelectionStart(e.currentTarget.selectionStart);
    setCursorSelectionEnd(e.currentTarget.selectionEnd);
  };

  useEffect(() => setInternalValue(p.value), [p.value]);
  useEffect(() => p.onChange(internalValue), [internalValue]);

  const focusCursor = (p: { newSelectionStart: number; newSelectionEnd: number }) => {
    setTimeout(() => {
      if (!textareaElmRef.current) return;
      textareaElmRef.current.selectionStart = p.newSelectionStart;
      textareaElmRef.current.selectionEnd = p.newSelectionEnd;
      textareaElmRef.current.focus();
    }, 0);
  };

  const wrapTags = (p: { tagOpen: string; tagClose: string }) => {
    const tagOpen = p.tagOpen;
    const tagClose = p.tagClose;

    const textBefore = internalValue.substring(0, cursorSelectionStart);
    const textHighlighted = internalValue.substring(cursorSelectionStart, cursorSelectionEnd);
    const textAfter = internalValue.substring(cursorSelectionEnd);

    const isDirectlyInsideTag =
      textBefore.slice(0 - tagOpen.length) === tagOpen &&
      textAfter.slice(0, tagClose.length) === tagClose;

    const resp = (() => {
      if (isDirectlyInsideTag) {
        setInternalValue(
          `${textBefore.slice(0, -tagOpen.length)}${textHighlighted}${textAfter.slice(tagClose.length)}`,
        );

        const newSelectionStart = cursorSelectionStart - tagOpen.length;
        const newSelectionEnd = cursorSelectionEnd - tagOpen.length;
        return { newSelectionStart, newSelectionEnd };
      }

      setInternalValue(`${textBefore}${tagOpen}${textHighlighted}${tagClose}${textAfter}`);

      const newSelectionStart = cursorSelectionStart + tagOpen.length;
      const newSelectionEnd = cursorSelectionEnd + tagOpen.length;

      return { newSelectionStart, newSelectionEnd };
    })();
    setCursorSelectionStart(resp.newSelectionStart);
    setCursorSelectionEnd(resp.newSelectionEnd);

    focusCursor(resp);
  };

  const addTagAtStartOfLine = (p: { tag: string }) => {
    const linesArray = internalValue.split("\n");

    const textBeforeCursor = internalValue.substring(0, cursorSelectionStart);
    const newlinesBeforeCursor = (textBeforeCursor.match(/\n/g) || []).length;
    const currentLineIndex = newlinesBeforeCursor;

    const linesBeforeCurrentLine = linesArray.slice(0, currentLineIndex);
    const currentLine = linesArray[currentLineIndex] ?? "";
    const linesAfterCurrentLine = linesArray.slice(currentLineIndex + 1);

    const editedCurrentLine = currentLine.startsWith(p.tag)
      ? currentLine.slice(p.tag.length)
      : `${p.tag}${currentLine}`;

    const editedText = [...linesBeforeCurrentLine, editedCurrentLine, ...linesAfterCurrentLine];

    setInternalValue(editedText.join("\n"));

    const cursorPositionOnCurrentLine =
      cursorSelectionStart - textBeforeCursor.lastIndexOf("\n") - 1;
    const isCursorWithinTag = cursorPositionOnCurrentLine <= p.tag.length;
    const isTagAdded = editedCurrentLine.length > currentLine.length;

    const newCursorPositions = (() => {
      if (isCursorWithinTag && !isTagAdded)
        return {
          newSelectionStart: cursorSelectionStart - cursorPositionOnCurrentLine,
          newSelectionEnd: cursorSelectionEnd - cursorPositionOnCurrentLine,
        };

      return {
        newSelectionStart: cursorSelectionStart + (isTagAdded ? p.tag.length : -p.tag.length),
        newSelectionEnd: cursorSelectionEnd + (isTagAdded ? p.tag.length : -p.tag.length),
      };
    })();

    setCursorSelectionStart(newCursorPositions.newSelectionStart);
    setCursorSelectionEnd(newCursorPositions.newSelectionEnd);

    focusCursor(newCursorPositions);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <Button onClick={() => addTagAtStartOfLine({ tag: "# " })}>
          <CustomIcon iconName="Heading1" size="md" />
        </Button>
        <Button onClick={() => addTagAtStartOfLine({ tag: "## " })}>
          <CustomIcon iconName="Heading2" size="md" />
        </Button>
        <Button onClick={() => addTagAtStartOfLine({ tag: "### " })}>
          <CustomIcon iconName="Heading3" size="md" />
        </Button>
        <span className="mx-1 h-8 border-l" />
        <Button onClick={() => wrapTags({ tagOpen: "**", tagClose: "**" })}>
          <CustomIcon iconName="Bold" size="md" />
        </Button>
        <Button onClick={() => wrapTags({ tagOpen: "_", tagClose: "_" })}>
          <CustomIcon iconName="Italic" size="md" />
        </Button>
        <span className="mx-1 h-8 border-l" />
        <Button onClick={() => wrapTags({ tagOpen: "[", tagClose: "]()" })}>
          <CustomIcon iconName="Link" size="md" />
        </Button>
        <Button onClick={() => wrapTags({ tagOpen: "![", tagClose: "]()" })}>
          <CustomIcon iconName="Image" size="md" />
        </Button>
        {/* Install remark-gfm for additional control */}
      </div>
      <Textarea
        ref={textareaElmRef}
        value={internalValue}
        onInput={(e) => {
          setInternalValue(e.currentTarget.value);
          handleCursorMove(e);
        }}
        onKeyUp={(e) => handleCursorMove(e)}
        onClick={(e) => handleCursorMove(e)}
        onMouseUp={(e) => handleCursorMove(e)}
        className="min-h-48 font-mono text-sm"
      />
    </div>
  );
};
