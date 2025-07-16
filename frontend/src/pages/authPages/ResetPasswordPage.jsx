import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../reducers/authReducer';
import TextInput from '../../components/form/TextInput';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { useAlert } from '../../context/AlertContext';
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const action = await dispatch(reset({ token, passwords: formData }));

      if (reset.fulfilled.match(action)) {
        showAlert('Password reset successful. You can now log in.', 'success');
        navigate('/login');
      } else {
        const msg = action.payload || 'Failed! Token may be invalid or expired.';
        showAlert(msg, 'error');
      }
    } catch (err) {
      const fallback = err.message || 'Something went wrong.';
      showAlert(fallback, 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-stone-900 dark:text-white">
          Reset Your Password
        </h2>

        <TextInput
          label="New Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <TextInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <Button type="submit" disabled={loading} className="mt-4 w-full">
          {loading ? <Loader className="mx-auto w-5 h-5" /> : 'Reset Password'}
        </Button>

        {/* Resend link is always shown */}
        <p className="mt-4 text-center text-sm text-stone-700 dark:text-stone-300">
          Token expired or invalid?{' '}
          <Link
            to="/forgot-password"
            className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
          >
            Resend Reset Link
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
