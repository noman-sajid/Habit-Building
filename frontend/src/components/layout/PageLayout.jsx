
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-stone-100 dark:bg-stone-900">
      <Navbar />
      <main className="flex-1 px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
