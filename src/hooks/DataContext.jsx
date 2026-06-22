import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState({ comments: {} });

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
