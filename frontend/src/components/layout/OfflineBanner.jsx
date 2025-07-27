// components/layout/OfflineBanner.jsx
import React from "react";
import { useSelector } from "react-redux";

const OfflineBanner = () => {
  const { isOnline } = useSelector((state) => state.offline);

  if (isOnline) return null;

  return (
    <div className="bg-red-500 text-white text-center py-2 text-sm">
      You are offline. Changes will sync when you reconnect.
    </div>
  );
};

export default OfflineBanner;
