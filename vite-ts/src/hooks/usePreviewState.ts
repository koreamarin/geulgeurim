import { useState, useCallback } from "react";

interface RowPreview {
  [key: number]: boolean;
}

export const usePreviewState = () => {
  const [openPreview, setOpenPreview] = useState<RowPreview>({});

  const togglePreview = useCallback((id: number) => {
    setOpenPreview(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  return { openPreview, togglePreview };
};
