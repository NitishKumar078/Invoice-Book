import { Customer } from '@/DataModels/DataModels';
// import { Invoice } from '@/DataModels/DataModels';

const DATABASE: string = process.env.DB_NAME || 'null';
const CUSTOMERSTORE: string = process.env.CUSTOMERSTORE || 'null';
const INVOICESTORE: string = process.env.INVOICESTORE || 'null';
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
        db.createObjectStore(INVOICESTORE, { keyPath: 'name' });
      }
    };
  });
};

export const customerDB = {
  async getAll(STORE: string): Promise<Customer[]> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, 'readonly');
      const store = transaction.objectStore(STORE);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async add(STORE: string, customer: Customer): Promise<void> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, 'readwrite');
      const store = transaction.objectStore(STORE);
      const request = store.add(customer);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  async update(STORE: string, customer: Customer): Promise<void> {
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
