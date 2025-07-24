// /components/dashboard/StatsGrid.jsx
const StatsGrid = () => {
  const stats = [
    { label: "Total Habits", value: 12 },
    { label: "Completed Today", value: 4 },
    { label: "Best Streak", value: 21 },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white dark:bg-stone-800 rounded-xl shadow p-4 text-center"
        >
          <div className="text-2xl font-bold text-amber-500">{stat.value}</div>
          <div className="text-sm text-stone-500 dark:text-stone-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
