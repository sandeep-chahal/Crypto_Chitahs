import { createContext, useContext, useEffect, useState, useRef } from "react";
import { DB } from "../utils/db";

const context = createContext();

const ContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [db, setDb] = useState(null);
  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    try {
      const db = new DB("CryptoChitahs");
      await db.collections(["items", "liked"], [{}, { autoIncrement: true }]);
      setDb(db);
      let _likedItems = await db.liked.getAll();
      console.log(_likedItems);
      _likedItems = _likedItems.reduce((acc, item) => {
        acc[item.key] = true;
        return acc;
      }, {});
      setLikedItems(_likedItems);
    } catch (err) {
      console.error(err);
    }
  };

  const updateLiked = (key, value) => {
    if (!db) {
      console.log("DB not initialized");
      return;
    }
    setLikedItems((lk) => ({ ...lk, [key]: value }));
    if (value)
      db.liked
        .insert({ key })
        .then(() => {
          console.log("Inserted!");
        })
        .catch((err) => {
          console.log(err);
        });
    else
      db.liked
        .remove(key)
        .then(() => {
          console.log("Removed!");
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <context.Provider
      value={{
        provider,
        setProvider,
        account,
        setAccount,
        db,
        likedItems,
        updateLiked,
      }}
    >
      {children}
    </context.Provider>
  );
};

export { context, ContextProvider };

export const useStore = () => useContext(context);
