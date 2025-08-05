import { useEffect } from "react";
import { useState } from "react";

export const useFileUrl = (file: File | null | undefined) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return setUrl(null);

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return url;
};
