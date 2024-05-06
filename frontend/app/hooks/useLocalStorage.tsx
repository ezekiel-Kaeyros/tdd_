export const useLocalStorage = (name: string): Function[] => {
  const getLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(name);
      if (local != null && local !== 'undefined') {
        return JSON?.parse(local);
      }
      return;
    }
  };
  const setLocalStorage = (item: Object) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, JSON.stringify(item));
    }
  };
  const removeLocalStorage = () => {
    if (typeof window !== 'undefined') {
      return localStorage.removeItem(name);
    }
  };
  return [getLocalStorage, setLocalStorage, removeLocalStorage];
};
