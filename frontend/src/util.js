import { useState, useEffect } from 'react'

// const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://127.0.0.1:8000';
const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://api.tajahat.com';

const useLocalStorage = keyName => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(keyName);
    try {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue;
    } catch(error) {
      return storedValue;
    }
  });

  useEffect(() => {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(keyName, stringifiedValue);
  }, [value]);

  return [value, setValue];
};

export { serverUrl, useLocalStorage };