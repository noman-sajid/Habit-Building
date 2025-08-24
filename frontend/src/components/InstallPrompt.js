import React, { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("User response:", outcome);

    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  // iOS Safari doesn’t support `beforeinstallprompt`
  const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  const isInStandalone = window.matchMedia("(display-mode: standalone)").matches;

  return (
    <>
      {showInstallBtn && (
        <button
          onClick={handleInstallClick}
          className="fixed bottom-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-2xl shadow-lg z-50"
        >
          📲 Install Habisium
        </button>
      )}

      {isIos && !isInStandalone && (
        <div className="fixed bottom-4 left-4 bg-white dark:bg-stone-800 text-stone-900 dark:text-white p-3 rounded-xl shadow-md z-50">
          Tap <span className="font-semibold">Share → Add to Home Screen</span> to install
        </div>
      )}
    </>
  );
};

export default InstallPrompt;
