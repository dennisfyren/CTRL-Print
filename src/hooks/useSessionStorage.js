import { useState } from "react";

function useSessionStorage(label, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = sessionStorage.getItem(label);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function setSessionStorage(valueOrUpdater) {
    const nextValue =
      typeof valueOrUpdater === "function"
        ? valueOrUpdater(state)
        : valueOrUpdater;

    setState(nextValue);
    sessionStorage.setItem(label, JSON.stringify(nextValue));
  }

  return [state, setSessionStorage];
}

export default useSessionStorage;
