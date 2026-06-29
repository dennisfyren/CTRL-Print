import { createContext, useContext } from "react";
import useSessionStorage from "./useSessionStorage";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useSessionStorage("ctrl_print_data", {
    comments: {},
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("Must be used within DataProvider");
  return ctx;
};
