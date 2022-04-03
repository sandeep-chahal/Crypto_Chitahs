import { createContext, useContext, useEffect, useState } from "react";
import { DB } from "../utils/db";

const context = createContext();

const ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [attributes, setAttributes] = useState(null);

  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    const db = new DB("CryptoChitahs");
    const mdCol = await db.collection("items");
    setAttributes(mdCol);
  };
  return (
    <context.Provider
      value={{
        provider,
        setProvider,
        account,
        setAccount,
        attributes,
      }}
    >
      {children}
    </context.Provider>
  );
};

export { context, ContextProvider };

export const useStore = () => useContext(context);
