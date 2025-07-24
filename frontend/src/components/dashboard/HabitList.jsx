// /components/dashboard/HabitList.jsx
import HabitCard from "./HabitCard";

const HabitList = () => {
  const habits = [
    { emoji: "🏃", title: "Morning Run", frequency: "Daily", streak: 7 },
    { emoji: "📖", title: "Read Book", frequency: "Daily", streak: 10 },
    { emoji: "💧", title: "Drink Water", frequency: "All day", streak: 5 },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Your Habits</h3>
      {habits.map((habit, i) => (
        <HabitCard key={i} {...habit} />
      ))}
    </div>
  );
};

export default HabitList;
