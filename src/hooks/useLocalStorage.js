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
    setState(dataToSet);
    localStorage.setItem(label, JSON.stringify(dataToSet));
  }
  return [state, setLocalStorage];
}

export default useLocalStorage;
