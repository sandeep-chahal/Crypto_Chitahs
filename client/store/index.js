import { createContext, useContext, useEffect, useState } from "react";
import { DB, importDb } from "../utils/db";

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
    const result = await mdCol.getMany([5, 10, 15, 20, 25, 30, 45, 60]);
    console.log(result);
    setAttributes(mdCol);
  };
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
