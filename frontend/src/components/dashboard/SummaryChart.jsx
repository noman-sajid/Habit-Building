// /components/dashboard/SummaryChart.jsx
const SummaryChart = () => {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>

      <div className="h-40 flex items-end justify-between">
        {[40, 60, 20, 80, 50, 70, 30].map((height, i) => (
          <div
            key={i}
            className="bg-amber-400 rounded-md w-6"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>

      <div className="flex justify-between mt-2 text-xs text-stone-500 dark:text-stone-400">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </div>
  );
};

export default SummaryChart;
