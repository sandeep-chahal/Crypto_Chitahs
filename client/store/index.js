import { createContext, useContext, useEffect, useState } from "react";

const context = createContext();

const ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  return (
    <context.Provider
      value={{
        provider,
        setProvider,
        account,
        setAccount,
      }}
    >
      {children}
    </context.Provider>
  );
};

export { context, ContextProvider };

export const useStore = () => useContext(context);
