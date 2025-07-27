// utils/networkStatus.js
import { setOnlineStatus } from '../reducers/offlineReducer';

export const listenNetworkStatus = (dispatch) => {
  const updateStatus = () => {
    const isOnline = navigator.onLine;
    dispatch(setOnlineStatus(isOnline));
    console.log('[NetworkStatus] Online:', isOnline);
  };

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);

  updateStatus(); // Set initial status
};
