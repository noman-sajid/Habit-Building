import React from 'react';

const VerticalTabs = ({ tabs, selected, onTabChange }) => {
  const activeTab = selected || tabs[0].label;

  const handleTabClick = (label) => {
    onTabChange?.(label);
  };

  const currentTab = tabs.find((tab) => tab.label === activeTab);

  return (
    <div className="flex">
      <div className="flex flex-col w-1/3 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label)}
            className={`px-4 py-2 rounded-md text-left transition ${
              activeTab === tab.label
                ? 'bg-primary text-white dark:bg-accent dark:text-stone-900'
                : 'text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-2/3 pl-4">{currentTab?.content}</div>
    </div>
  );
};

export default VerticalTabs;
