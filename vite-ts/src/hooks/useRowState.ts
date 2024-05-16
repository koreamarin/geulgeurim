import { useState, useCallback } from "react";

interface RowState {
  [key: number]: boolean;
}

export const useRowState = () => {
  const [openRows, setOpenRows] = useState<RowState>({});

  const toggleRow = useCallback((id: number) => {
    setOpenRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  return { openRows, toggleRow };
};
