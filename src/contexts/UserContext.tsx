import { createContext, useState, useMemo, useCallback } from "react";

export const UserContext = createContext();

export const UserDataProvider = ({ children }) => {
  const defaultVal = 0

  const [count, setCount] = useState(defaultVal);

  const resetCount = useCallback(() => {
    setCount(defaultVal);
  }, []);

  const isChanged = useMemo(() => count !== defaultVal, [count]);

  return (
    <UserContext.Provider value={{ count, setCount, resetCount, isChanged }}>
      {children}
    </UserContext.Provider>
  );
};
