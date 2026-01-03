import { type ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { type AppStore, store } from "@/store/index";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
