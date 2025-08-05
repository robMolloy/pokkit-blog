import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pb } from "@/config/pocketbaseConfig";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createBlogPostImageRecord } from "./dbBlogPostImageRecordUtils";
import { useFileUrl } from "./fileUtils";
import { CustomIcon } from "@/components/CustomIcon";

export const CreateBlogPostImageForm = () => {
  const [image, setImage] = useState<File>();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const fileUrl = useFileUrl(image);

  useEffect(() => {
    if (imageInputRef.current && !image) imageInputRef.current.value = "";
  }, [image]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          ref={imageInputRef}
          type="file"
          onInput={(e) => {
            const files = (e.target as unknown as { files: File[] }).files;
            const file = files[0];
            setImage(file);
          }}
        />
      </div>
      <div className="flex justify-center">
        {fileUrl ? (
          <div className="relative">
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-0 top-0 h-5 w-5 -translate-y-1/2 translate-x-1/2 rounded-full"
              onClick={() => setImage(undefined)}
            >
              <CustomIcon iconName="X" size="xs" />
            </Button>
            <img className="h-24" src={fileUrl} />
          </div>
        ) : (
          <CustomIcon iconName="Image" size="4xl" />
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          onClick={async () => {
            if (!image) return;
            if (isLoading) return;
            setIsLoading(true);

            const resp = await createBlogPostImageRecord({ pb, data: { imageUrl: image } });

            setIsLoading(false);
            if (!resp.success) return toast("Something went wrong", { duration: 10_000 });

            toast("Blog post created successfully!", {
              duration: 10_000,
              action: {
                label: "Go to blog post",
                onClick: () => router.push(`/admin/blog-post/${resp.data.id}`),
              },
            });

            setImage(undefined);
          }}
        >
          Save Post
        </Button>
      </div>
    </div>
  );
};
