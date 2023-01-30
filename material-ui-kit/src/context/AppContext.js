import { createContext } from "react";

export const appContext = createContext({
  isRtl: false,
  toggleRtl: () => { }
});