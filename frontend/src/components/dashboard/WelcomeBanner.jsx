// /components/dashboard/WelcomeBanner.jsx
import { useSelector } from 'react-redux';

const WelcomeBanner = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold text-amber-600">Hi {user?.name} 👋</h2>
      <p className="text-stone-500 dark:text-stone-400 mt-1">
        Ready to keep your streak alive?
      </p>
    </div>
  );
};

export default WelcomeBanner;
