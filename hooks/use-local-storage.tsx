import { useState, useEffect } from "react";

export type FakeUserData = {
  firstName: string;
  // socials
  bmcHandle: string;
  twitter: string;
  github: string;
  about: string;
};

export const STORAGE_KEY = {
  USER_DATA: "user_data",
} as const;

type UseLocalStorageReturn<T> = {
  value: T | undefined;
  set: (newValue: T) => void;
  get: () => T | undefined;
};

export function useLocalStorage<T>(key?: string): UseLocalStorageReturn<T> {
  const [value, setValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (!key) return;
    const item = window.localStorage.getItem(key);
    if (item !== null) {
      try {
        setValue(JSON.parse(item) as T);
      } catch (err) {
        console.warn(`Failed to parse localStorage item for key "${key}"`, err);
      }
    }
  }, [key]);

  const set = (newValue: T) => {
    if (!key) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (err) {
      console.warn(`Failed to set localStorage for key "${key}"`, err);
    }
  };

  const get = (): T | undefined => {
    if (!key) return;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : undefined;
    } catch (err) {
      console.warn(`Failed to get localStorage for key "${key}"`, err);
      return undefined;
    }
  };

  return { value, set, get };
}
// export function useLocalStorage<T>(key: string, initialValue: T) {
//   const [storedValue, setStoredValue] = useState<T>("" as any);

//   useEffect(() => {
//     function load() {
//       try {
//         console.log("Hey");
//         const item = window.localStorage.getItem(key);
//         return item ? (JSON.parse(item) as T) : initialValue;
//       } catch (error) {
//         console.warn(`Error reading localStorage key “${key}”:`, error);
//         return initialValue;
//       }
//     }

//     load();
//   }, [key]);

//   // useEffect(() => {
//   //  if (!storedValue) return
//   //   try {
//   //     window.localStorage.setItem(key, JSON.stringify(storedValue));
//   //   } catch (error) {
//   //     console.warn(`Error setting localStorage key “${key}”:`, error);
//   //   }
//   // }, [key, storedValue]);

//   return [storedValue, setStoredValue] as const;
// }
