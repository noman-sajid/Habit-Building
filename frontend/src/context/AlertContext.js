import React, { createContext, useState, useCallback, useContext } from 'react';
import Alert from '../components/common/Alert';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

 const showAlert = useCallback((message, type = 'info', duration = 5000) => {
  if (!message) return;

  const id = Date.now();
  setAlerts((prev) => [
    ...prev,
    { id, message, type, duration },
  ]);

  const timeout = setTimeout(() => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, duration);

  return () => clearTimeout(timeout);
}, []);


  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 space-y-3 w-full max-w-sm px-4">

        {alerts.map(({ id, ...props }) => (
          <Alert
            key={id}
            {...props}
            onClose={() => removeAlert(id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
