// /components/dashboard/ProgressRing.jsx
const ProgressRing = () => {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl shadow p-6 flex flex-col items-center">
      {/* SVG Circle Progress */}
      <svg width="120" height="120" className="transform -rotate-90">
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#f59e0b"
          strokeWidth="10"
          fill="none"
          strokeDasharray="314"
          strokeDashoffset="157" // 50% progress
          strokeLinecap="round"
        />
      </svg>

      {/* Percentage */}
      <div className="mt-4 text-lg font-bold">50%</div>
      <p className="text-sm text-stone-500 dark:text-stone-400">
        3 / 6 habits done
      </p>
    </div>
  );
};

export default ProgressRing;
