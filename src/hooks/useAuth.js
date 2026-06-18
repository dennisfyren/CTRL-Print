import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import useSessionStorage from "./useSessionStorage";

const HASH_KEY = "ctrl_print_hash";

async function hashPassword(password) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode("myapp-salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );
  return Array.from(new Uint8Array(bits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function useAuth() {
  const [storedHash, setStoredHash] = useLocalStorage(HASH_KEY, null);
  const [authed, setAuthed] = useSessionStorage("myapp_authed", false);

  async function setPassword(password) {
    const hash = await hashPassword(password);
    setStoredHash(hash);
    setAuthed(true);
  }

  async function login(password) {
    const hash = await hashPassword(password);
    if (hash === storedHash) {
      setAuthed(true);
      return true;
    }
    return false;
  }

  function logout() {
    setAuthed(false);
  }

  function resetApp() {
    localStorage.clear(); // or just localStorage.removeItem(HASH_KEY) to be surgical
    sessionStorage.clear();
    window.location.reload();
  }

  return {
    authed,
    isSetup: !!storedHash,
    setPassword,
    login,
    logout,
    resetApp,
  };
}
