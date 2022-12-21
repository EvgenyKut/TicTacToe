import { useEffect, useRef, useState } from 'react';

type TLocalStorageState = {
  key: string;
  defaultValue?: any;
  serialize?: any;
  deserialize?: any;
};
export function useLocalStorageState({
  key,
  defaultValue = '',
  serialize = JSON.stringify,
  deserialize = JSON.parse,
}: TLocalStorageState) {
  const getInitValue = () => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  };
  const [state, setState] = useState(getInitValue);

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}
