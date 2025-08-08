import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, loginGoogle } from '../../reducers/authReducer';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      const message = err?.response?.data?.message || 'Login failed';
      const lower = message.toLowerCase();

      const fieldErrors = {};
      if (lower.includes('email')) {
        fieldErrors.email = 'Incorrect email';
      } else if (lower.includes('password')) {
        fieldErrors.password = 'Incorrect password';
      } else {
        fieldErrors.password = 'Login failed. Please try again.';
      }

      setErrors(fieldErrors);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      await dispatch(loginGoogle({ credential: response.credential })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login failed:', err);
      setErrors({ password: 'Google login failed. Please try again.' });
    }
  };

  const handleGoogleFailure = () => {
    setErrors({ password: 'Google login was cancelled or failed.' });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-stone-100 dark:bg-stone-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-stone-900 dark:text-stone-100">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-200">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-800 text-stone-900 dark:text-white"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-200">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-800 text-stone-900 dark:text-white"
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md shadow-sm"
        >
          Login
        </button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-4">
        <span className="text-sm text-stone-500 dark:text-stone-400">or</span>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap
        />
      </div>
    </div>
  );
}

export default LoginPage;
