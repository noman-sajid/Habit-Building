import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/form/TextInput';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await dispatch(login(formData)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      const message = err?.response?.data?.message || 'Login failed';
      const lower = message.toLowerCase();
      const fieldErrors = {};

      if (lower.includes('email')) fieldErrors.email = 'Incorrect email';
      else if (lower.includes('password')) fieldErrors.password = 'Incorrect password';
      else fieldErrors.password = 'Login failed'; // fallback if message is vague

      setErrors(fieldErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-stone-900 dark:text-stone-100">
          Log In
        </h2>

        <TextInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          error={errors.email}
          required
        />

        <TextInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
          className="mt-4"
        >
          {loading ? <Loader size="sm" /> : 'Log In'}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
