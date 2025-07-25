import React from "react";
import { useSelector } from "react-redux";
import HabitCard from "./HabitCard";

const HabitList = () => {
  const { habits, loading } = useSelector((state) => state.habits);

  if (loading) {
    return <p className="text-stone-500">Loading habits...</p>;
  }

  if (!habits || habits.length === 0) {
    return (
      <p className="text-stone-500 dark:text-stone-400 text-center">
        No habits yet. Create one to get started!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {habits.map((habit) =>
        habit?._id ? <HabitCard key={habit._id} habit={habit} /> : null
      )}
    </div>
  );
};

export default HabitList;
