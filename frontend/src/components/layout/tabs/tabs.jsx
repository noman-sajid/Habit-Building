import React from 'react';

const Tabs = ({ tabs, selected, onTabChange }) => {
  const activeTab = selected || tabs[0].label;

  const handleTabClick = (label) => {
    onTabChange?.(label);
  };

  const currentTab = tabs.find((tab) => tab.label === activeTab);

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex border-b border-stone-300 dark:border-stone-600">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab.label
                ? 'border-b-2 border-primary text-primary dark:text-accent'
                : 'text-stone-600 dark:text-stone-300 hover:text-primary dark:hover:text-accent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">{currentTab?.content}</div>
    </div>
  );
};

export default Tabs;
