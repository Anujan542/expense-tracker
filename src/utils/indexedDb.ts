import { openDB } from 'idb';
import { type OfflineAction } from '../redux/offline/offlineQueueSlice';

const DB_NAME = 'expense-tracker';
const STORE_NAME = 'offlineQueue';

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
});

export const saveQueue = async (queue: OfflineAction[]) => {
  const db = await dbPromise;
  await db.put(STORE_NAME, queue, 'queue');
};

export const loadQueue = async (): Promise<OfflineAction[]> => {
  const db = await dbPromise;
  return (await db.get(STORE_NAME, 'queue')) || [];
};
