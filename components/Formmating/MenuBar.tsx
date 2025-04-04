export default function MenuBar({ editor }: { editor: any }) {
  if (!editor) return null;

  return (
    <div className="flex justify-center my-4">
      <div className="flex flex-wrap gap-2 max-w-4xl">
        {[
          {
            label: "H1",
            action: () =>
              editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive("heading", { level: 1 }),
          },
          {
            label: "H2",
            action: () =>
              editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive("heading", { level: 2 }),
          },
          {
            label: "H3",
            action: () =>
              editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editor.isActive("heading", { level: 3 }),
          },
          {
            label: "P",
            action: () => editor.chain().focus().setParagraph().run(),
            isActive: editor.isActive("paragraph"),
          },
          {
            label: "B",
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive("bold"),
          },
          {
            label: "I",
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive("italic"),
          },
          {
            label: "U",
            action: () => editor.chain().focus().toggleUnderline().run(),
            isActive: editor.isActive("underline"),
          },
          {
            label: "S",
            action: () => editor.chain().focus().toggleStrike().run(),
            isActive: editor.isActive("strike"),
          },
          {
            label: "Highlight",
            action: () => editor.chain().focus().toggleHighlight().run(),
            isActive: editor.isActive("highlight"),
          },
          {
            label: "Sub",
            action: () => editor.chain().focus().toggleSubscript().run(),
            isActive: editor.isActive("subscript"),
          },
          {
            label: "Sup",
            action: () => editor.chain().focus().toggleSuperscript().run(),
            isActive: editor.isActive("superscript"),
          },
          {
            label: "Bullet List",
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive("bulletList"),
          },
          {
            label: "Ordered List",
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive("orderedList"),
          },
          {
            label: "Code Block",
            action: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: editor.isActive("codeBlock"),
          },
          {
            label: "Blockquote",
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: editor.isActive("blockquote"),
          },
          {
            label: "Left",
            action: () => editor.chain().focus().setTextAlign("left").run(),
            isActive: editor.isActive({ textAlign: "left" }),
          },
          {
            label: "Center",
            action: () => editor.chain().focus().setTextAlign("center").run(),
            isActive: editor.isActive({ textAlign: "center" }),
          },
          {
            label: "Right",
            action: () => editor.chain().focus().setTextAlign("right").run(),
            isActive: editor.isActive({ textAlign: "right" }),
          },
          {
            label: "Justify",
            action: () => editor.chain().focus().setTextAlign("justify").run(),
            isActive: editor.isActive({ textAlign: "justify" }),
          },
          {
            label: "Indent",
            action: () => editor.chain().focus().indent().run(),
            isActive: false,
          },
          {
            label: "Outdent",
            action: () => editor.chain().focus().outdent().run(),
            isActive: false,
          },
          {
            label: "Clear",
            action: () =>
              editor.chain().focus().unsetAllMarks().clearNodes().run(),
            isActive: false,
          },
          {
            label: "Undo",
            action: () => editor.chain().focus().undo().run(),
            isActive: false,
          },
          {
            label: "Redo",
            action: () => editor.chain().focus().redo().run(),
            isActive: false,
          },
        ].map(({ label, action, isActive }) => (
          <button
            key={label}
            onClick={action}
            className={`
                px-4 py-2 
                rounded-lg 
                text-sm 
                font-medium 
                transition-all 
                duration-200 
                shadow-sm
                ${
                  isActive
                    ? "bg-[#164B20] text-white hover:bg-[#1c5d28]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
