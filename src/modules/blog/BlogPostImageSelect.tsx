import React, { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X } from "lucide-react";
import { TBlogPostImageRecord } from "./dbBlogPostImageRecordUtils";
import { PocketBase } from "@/config/pocketbaseConfig";

export const BlogPostImageSelect = (p: {
  pb: PocketBase;
  blogPostImageRecords: TBlogPostImageRecord[];
  value: string;
  onChange: (x?: TBlogPostImageRecord) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedValue, setSelectedValue] = useState<TBlogPostImageRecord | undefined>(
    p.blogPostImageRecords.find((x) => x.id === p.value),
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const suggestedBlogPostImageRecords =
    p.blogPostImageRecords.filter((item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()),
    ) ?? [];

  useEffect(() => setSelectedIndex(0), [searchTerm]);

  useEffect(() => {
    if (!containerRef.current) return;

    const selectedElement = containerRef.current.children[selectedIndex];
    if (selectedElement) selectedElement.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  useEffect(() => {
    setSelectedValue(p.blogPostImageRecords.find((x) => x.id === p.value));
  }, [p.value]);

  useEffect(() => {
    p.onChange(selectedValue);
    setSearchTerm(selectedValue?.id ?? "");
  }, [selectedValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestedBlogPostImageRecords.length === 0) return;

    if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) e.preventDefault();

    if (e.key === "Escape") setOpen(false);
    if (e.key === "ArrowDown")
      setSelectedIndex((prev) =>
        prev < suggestedBlogPostImageRecords.length - 1 ? prev + 1 : prev,
      );
    if (e.key === "ArrowUp") setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    if (e.key === "Enter") {
      const selectedBlogPostImageRecord = suggestedBlogPostImageRecords[selectedIndex];
      if (!selectedBlogPostImageRecord) setSelectedValue(selectedBlogPostImageRecord);
    }
  };

  return (
    <div className="relative">
      <Popover open={open}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="w-full pr-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
            />
            {searchTerm.length > 0 && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  setSelectedValue(undefined);
                  inputRef.current?.focus();
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <div ref={containerRef} className="max-h-96 overflow-y-auto">
            {suggestedBlogPostImageRecords.map((blogPostImageRecord, index) =>
              (() => {
                return (
                  <div
                    key={blogPostImageRecord.id}
                    className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-2 hover:bg-accent hover:text-accent-foreground ${
                      selectedIndex === index ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => {
                      setSelectedValue(blogPostImageRecord);
                      setOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
                      {blogPostImageRecord.id}
                    </div>
                    <div className="w-32 shrink-0 overflow-hidden overflow-ellipsis whitespace-nowrap text-right text-xs text-muted-foreground">
                      <img
                        src={p.pb.files.getURL(blogPostImageRecord, blogPostImageRecord.imageUrl, {
                          thumb: "300x100",
                        })}
                      />
                    </div>
                  </div>
                );
              })(),
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
