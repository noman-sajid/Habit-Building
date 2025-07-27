// reducers/offlineReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOnline: true,
  queue: [],         // Actions queued for sync
  syncing: false,    // Is the queue being flushed?
};

const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
    addToQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    setSyncing: (state, action) => {
      state.syncing = action.payload;
    },
    clearQueue: (state) => {
      state.queue = [];
    },
  },
});

export const { setOnlineStatus, addToQueue, setSyncing, clearQueue } = offlineSlice.actions;
export default offlineSlice.reducer;
