// offline/syncQueue.js
import { addToQueueDB, getQueue, clearQueueDB } from './indexedDB';

export const addToQueue = async (action) => {
  console.log('[SyncQueue] Adding action to queue:', action);
  await addToQueueDB(action);
};

export const flushQueue = async () => {
  console.log('[SyncQueue] Flushing queued actions...');
  const queuedActions = await getQueue();

  for (const action of queuedActions) {
    try {
      // TODO: Call actual API based on action type
      console.log('[SyncQueue] Syncing action:', action);
    } catch (err) {
      console.error('[SyncQueue] Failed to sync action:', err);
    }
  }

  await clearQueueDB();
  console.log('[SyncQueue] Queue cleared after sync.');
};
