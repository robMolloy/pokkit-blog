import { CustomIcon } from "@/components/CustomIcon";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const TipTap = (p: { description: string; onChange: (text: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
    ],
    content: p.description,
    onUpdate: ({ editor }) => {
      p.onChange(editor.getText());
    },
    immediatelyRender: false,
  });

  return (
    <>
      <CustomIcon iconName="Bold" size="md" />
      <CustomIcon iconName="Italic" size="md" />
      <CustomIcon iconName="Strikethrough" size="md" />
      <EditorContent editor={editor} />
    </>
  );
};
