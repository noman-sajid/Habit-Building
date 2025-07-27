// offline/indexedDB.js
import { openDB } from 'idb';
import { DB_NAME, DB_VERSION, HABITS_STORE, QUEUE_STORE } from '../utils/constants';

let db;

export const initDB = async () => {
  if (!db) {
    db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(upgradeDB) {
        if (!upgradeDB.objectStoreNames.contains(HABITS_STORE)) {
          upgradeDB.createObjectStore(HABITS_STORE, { keyPath: '_id' });
        }
        if (!upgradeDB.objectStoreNames.contains(QUEUE_STORE)) {
          upgradeDB.createObjectStore(QUEUE_STORE, { autoIncrement: true });
        }
      }
    });
  }
  return db;
};

export const saveHabits = async (habits) => {
  const database = await initDB();
  const tx = database.transaction(HABITS_STORE, 'readwrite');
  habits.forEach(habit => tx.store.put(habit));
  await tx.done;
};

export const getHabits = async () => {
  const database = await initDB();
  return database.getAll(HABITS_STORE);
};

export const addToQueueDB = async (action) => {
  const database = await initDB();
  await database.add(QUEUE_STORE, action);
};

export const getQueue = async () => {
  const database = await initDB();
  return database.getAll(QUEUE_STORE);
};

export const clearQueueDB = async () => {
  const database = await initDB();
  const tx = database.transaction(QUEUE_STORE, 'readwrite');
  await tx.store.clear();
};
