import { useState } from "react";

function useSessionStorage(label, data) {
  const [state, setState] = useState(() => {
    try {
      const item = JSON.parse(sessionStorage.getItem(label));
      return item ? item : data;
    } catch {
      return data;
    }
  });
  function setSessionStorage(dataToSet) {
    setState(dataToSet);
    sessionStorage.setItem(label, JSON.stringify(dataToSet));
  }
  return [state, setSessionStorage];
}

export default useSessionStorage;
