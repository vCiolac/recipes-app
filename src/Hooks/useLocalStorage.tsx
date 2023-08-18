import { useEffect, useState } from 'react';

type UseLocalStorageResult = [string,
  React.Dispatch<React.SetStateAction<object | null>>];

function useLocalStorage(
  key: string,
  initialValue?: object | null,
): UseLocalStorageResult {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (localStorageValue) {
      localStorage.setItem(key, JSON.stringify(localStorageValue));
    }
  }, [key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
}

export default useLocalStorage;
