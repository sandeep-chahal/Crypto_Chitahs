import { importDb } from "./index";

export class DB {
  constructor(name) {
    this.dbName = name;
    this.db = null;
  }

  collections(collectionNames, collectionConfigs) {
    return new Promise((resolve, reject) => {
      let openRequest = indexedDB.open(this.dbName, 1);

      openRequest.onupgradeneeded = function () {
        let db = openRequest.result;
        collectionNames.forEach((collectionName) => {
          if (!db.objectStoreNames.contains(collectionName)) {
            // if there's no store
            db.createObjectStore(collectionName, {
              keyPath: "key",
              ...collectionConfigs[collectionNames.indexOf(collectionName)],
            }); // create it
          }
        });
      };

      openRequest.onsuccess = async () => {
        let db = openRequest.result;
        this.db = db;

        collectionNames.forEach(async (collectionName) => {
          const collection = new Collection(db, collectionName);
          // add collection to this
          this[collectionName] = collection;

          // additional setup
          if (collectionName === "items") {
            const count = await collection.count();
            if (count !== 3974) {
              const data = await importDb();
              await collection.insertMany(data);
            }
          }
        });

        resolve(true);
      };
      openRequest.onerror = function (e) {
        console.log("error", e);
        reject(e);
      };
    });
  }
}

class Collection {
  constructor(db, name) {
    this.db = db;
    this.name = name;
  }
  insert(data) {
    return new Promise((res, rej) => {
      let transaction = this.db.transaction(this.name, "readwrite");

      // get an object store to operate on it
      let storeItem = transaction.objectStore(this.name);

      let request = storeItem.add(data); // (3)

      request.onsuccess = function () {
        // (4)
        res(true);
      };

      request.onerror = function () {
        console.log("Error", request.error);
        rej(request.error);
      };
    });
  }
  remove(key) {
    return new Promise((res, rej) => {
      let transaction = this.db.transaction(this.name, "readwrite");

      // get an object store to operate on it
      let storeItem = transaction.objectStore(this.name);

      let request = storeItem.delete(key); // (3)

      request.onsuccess = function () {
        // (4)
        res(true);
      };

      request.onerror = function () {
        console.log("Error", request.error);
        rej(request.error);
      };
    });
  }
  insertMany(items) {
    new Promise((res, rej) => {
      let transaction = this.db.transaction(this.name, "readwrite");

      // get an object store to operate on it
      let storeItem = transaction.objectStore(this.name);

      items.forEach((item, i) => {
        storeItem.add({ ...item, key: i + 1 }); // (3)
      });

      transaction.oncomplete = () => {
        console.log("Bulk add successful");
        res(true);
      };
      transaction.onabort = function () {
        console.log("Error", transaction.error);
        rej(transaction.error);
      };
    });
  }

  get(id) {
    return new Promise((res, rej) => {
      let transaction = this.db.transaction(this.name, "readonly");
      let storeItem = transaction.objectStore(this.name);
      const request = storeItem.get(id);

      request.onsuccess = function () {
        if (request.result !== undefined) {
          res(request.result);
        } else {
          res(null);
        }
      };
      request.onabort = function () {
        console.log("Error", request.error);
        rej(null);
      };
    });
  }
  getMany(ids) {
    return new Promise((res, rej) => {
      let transaction = this.db.transaction(this.name, "readonly");
      let storeItem = transaction.objectStore(this.name);
      let result = [];
      ids.forEach((id, i) => {
        const request = storeItem.get(id);
        request.onsuccess = function () {
          if (request.result !== undefined) {
            result[i] = request.result;
          } else {
            result[i] = null;
          }
        };
        request.onabort = function () {
          console.log("Error", request.error);
          result[i] = null;
        };
      });
      transaction.oncomplete = () => {
        res(result);
      };
    });
  }
  query(filter) {
    return new Promise((res, rej) => {
      const results = [];
      var transaction = this.db.transaction(this.name, "readonly");
      var objectStore = transaction.objectStore(this.name);
      var request = objectStore.openCursor();
      request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          let shouldAdd = true;
          filter.forEach((f, i) => {
            if (cursor.value[f.key] === f.value && shouldAdd) {
              shouldAdd = true;
            } else {
              shouldAdd = false;
            }
          });
          if (shouldAdd) results.push({ ...cursor.value });
          cursor.continue();
        }
      };
      transaction.oncomplete = () => {
        res(results);
      };

      request.onerror = function () {
        console.log("error", request.error);
        rej(request.error);
      };
    });
  }

  count() {
    return new Promise((res, rej) => {
      var transaction = this.db.transaction(this.name, "readonly");
      var objectStore = transaction.objectStore(this.name);

      var countRequest = objectStore.count();
      countRequest.onsuccess = function () {
        res(countRequest.result);
      };
      countRequest.onerror = () => {
        rej(countRequest.error);
      };
    });
  }

  getAll() {
    return new Promise((res, rej) => {
      var transaction = this.db.transaction(this.name, "readonly");
      var objectStore = transaction.objectStore(this.name);

      const request = objectStore.getAll();
      request.onsuccess = (e) => {
        res(e.target.result);
      };
      request.onerror = () => {
        rej(e.error);
      };
    });
  }
}
