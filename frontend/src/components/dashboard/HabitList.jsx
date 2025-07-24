// /components/dashboard/HabitList.jsx
import React from "react";
import { useSelector } from "react-redux";
import HabitCard from "./HabitCard";

const HabitList = () => {
  const { habits, loading } = useSelector((state) => state.habits);

  if (loading) {
    return <p className="text-stone-500">Loading habits...</p>;
  }

  if (!habits || habits.length === 0) {
    return <p className="text-stone-500">No habits yet. Create one!</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Your Habits</h3>
      {habits.map((habit) => (
        <HabitCard key={habit._id} habit={habit} />
      ))}
    </div>
  );
};

export default HabitList;
