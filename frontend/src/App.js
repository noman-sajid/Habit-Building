import React from "react";
import "./App.css";
function App() {
  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center">
      <div className="text-center p-6 rounded-xl shadow-lg bg-white dark:bg-dark">
        <h1 className="text-4xl font-poppins font-bold text-primary mb-4">
          Welcome to Hibo
        </h1>
        <p className="text-lg font-inter text-dark dark:text-white">
          Your habit journey begins here.
        </p>
        <button className="mt-6 px-6 py-2 bg-accent text-dark font-semibold rounded-md hover:bg-primary hover:text-white transition">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
