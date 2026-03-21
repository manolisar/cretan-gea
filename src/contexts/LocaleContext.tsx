import { createContext, useContext } from "react";

const LocaleContext = createContext("en");

export const LocaleProvider = LocaleContext.Provider;
export const useLocale = () => useContext(LocaleContext);
