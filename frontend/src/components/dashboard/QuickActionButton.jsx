// /components/dashboard/QuickActionButton.jsx
import { useNavigate } from "react-router-dom";

const QuickActionButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/create-habit")}
      className="fixed bottom-6 right-6 bg-amber-500 text-white text-3xl w-14 h-14 rounded-full shadow-lg hover:bg-amber-600"
    >
      +
    </button>
  );
};

export default QuickActionButton;
