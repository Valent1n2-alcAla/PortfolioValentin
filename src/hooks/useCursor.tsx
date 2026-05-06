import { createContext, useContext, useState, type ReactNode } from "react";

export type CursorVariant = "default" | "project";

interface CursorCtxType {
  variant: CursorVariant;
  setVariant: (v: CursorVariant) => void;
}

const CursorCtx = createContext<CursorCtxType>({
  variant: "default",
  setVariant: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  return (
    <CursorCtx.Provider value={{ variant, setVariant }}>
      {children}
    </CursorCtx.Provider>
  );
}

export function useCursor() {
  return useContext(CursorCtx);
}
