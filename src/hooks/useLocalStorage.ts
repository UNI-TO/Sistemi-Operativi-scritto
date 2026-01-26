import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State per memorizzare il valore
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Prova a recuperare dal localStorage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Ritorna una versione wrapped del setter che persiste in localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permetti che value sia una funzione per avere la stessa API di useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      // Salva in localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

export function clearExamProgress(examId: string) {
  try {
    window.localStorage.removeItem(`exam_progress_${examId}`);
    window.localStorage.removeItem(`exam_score_${examId}`);
  } catch (error) {
    console.error('Error clearing exam progress:', error);
  }
}

export function getAllExamProgress(): Record<string, any> {
  const progress: Record<string, any> = {};

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('exam_progress_')) {
        const examId = key.replace('exam_progress_', '');
        const data = localStorage.getItem(key);
        if (data) {
          progress[examId] = JSON.parse(data);
        }
      }
    }
  } catch (error) {
    console.error('Error getting all exam progress:', error);
  }

  return progress;
}
