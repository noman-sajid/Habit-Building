
import React from 'react';

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900">
      <main className="px-4 py-6">{children}</main>
    </div>
  );
};

export default PageLayout;
