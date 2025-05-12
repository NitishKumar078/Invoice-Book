let DATABASE = '';
const CUSTOMERSTORE = import.meta.env.VITE_CUSTOMERSTORE;
const INVOICESTORE = import.meta.env.VITE_INVOICESTORE;
const ITEMSTORE = import.meta.env.VITE_ITEMSTORE;
const DB_VERSION = 1;

export const initDB = (): Promise<IDBDatabase> => {
  const user = JSON.parse(localStorage.getItem('userInfo') || '{}');
  if (!user?.company) {
    return Promise.reject(
      new Error('User information is missing. Cannot initialize database.')
    );
  }
  DATABASE = user.company + '_' + import.meta.env.VITE_DB_NAME;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, DB_VERSION);

    request.onerror = () => {
      if (request.error?.name === 'NotFoundError') {
        reject(
          new Error(
            'Database not found. Please ensure the database exists before proceeding.'
          )
        );
      } else {
        reject(request.error);
      }
    };
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(CUSTOMERSTORE)) {
        db.createObjectStore(CUSTOMERSTORE, { keyPath: 'company' });
      }
      if (!db.objectStoreNames.contains(INVOICESTORE)) {
        db.createObjectStore(INVOICESTORE, { keyPath: 'invoiceId' });
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

  async update(STORE: string, data: any): Promise<void> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, 'readwrite');
      const store = transaction.objectStore(STORE);
      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  async delete(STORE: string, key: any): Promise<void> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, 'readwrite');
      const store = transaction.objectStore(STORE);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },
};
