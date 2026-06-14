import { useState } from "react";

function useLocalStorage(label, data) {
  const [state, setState] = useState(() => {
    try {
      const item = JSON.parse(localStorage.getItem(label));
      return item ? item : data;
    } catch {
      return data;
    }
  });
  function setLocalStorage(dataToSet) {
    const value =
      typeof dataToSet === "function" ? dataToSet(state) : dataToSet;
    setState(value);
    localStorage.setItem(label, JSON.stringify(value));
  }
  return [state, setLocalStorage];
}

export default useLocalStorage;
