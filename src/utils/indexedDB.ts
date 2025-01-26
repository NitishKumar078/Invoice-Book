const DATABASE = import.meta.env.VITE_DB_NAME;
const CUSTOMERSTORE = import.meta.env.VITE_CUSTOMERSTORE;
const INVOICESTORE = import.meta.env.VITE_INVOICESTORE;
const ITEMSTORE = import.meta.env.VITE_ITEMSTORE;
const DB_VERSION = 1;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(CUSTOMERSTORE)) {
        db.createObjectStore(CUSTOMERSTORE, { keyPath: 'name' });
      }
      if (!db.objectStoreNames.contains(INVOICESTORE)) {
        db.createObjectStore(INVOICESTORE, { keyPath: 'Iid' });
      }
      if (!db.objectStoreNames.contains(ITEMSTORE)) {
        db.createObjectStore(ITEMSTORE, { keyPath: 'hsnCode' });
      }
    };
  });
};

export const getDataBase = {
  async getAll(STORE: string): Promise<any[]> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, 'readonly');
      const store = transaction.objectStore(STORE);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async add(STORE: string, data: any): Promise<void> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, 'readwrite');
      const store = transaction.objectStore(STORE);
      const request = store.add(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  async update(STORE: string, customer: any): Promise<void> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, 'readwrite');
      const store = transaction.objectStore(STORE);
      const request = store.put(customer);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  async delete(STORE: string, name: string): Promise<void> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, 'readwrite');
      const store = transaction.objectStore(STORE);
      const request = store.delete(name);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },
};
