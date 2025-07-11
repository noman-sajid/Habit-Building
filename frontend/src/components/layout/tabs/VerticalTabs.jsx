import React from 'react';

const VerticalTabs = ({ tabs = [], activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-left rounded-lg transition-colors duration-200 font-medium
            ${
              activeTab === tab.id
                ? 'bg-primary text-white dark:bg-accent dark:text-stone-900'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default VerticalTabs;
