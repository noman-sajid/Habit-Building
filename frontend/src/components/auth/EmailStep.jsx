import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginGoogle } from '../../reducers/authReducer';
import { FcGoogle } from 'react-icons/fc';
import TextInput from '../form/TextInput';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { useAlert } from '../../context/AlertContext';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const EmailStep = ({ email, onChange, onNext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { loading } = useSelector((state) => state.auth);

  const [errors, setErrors] = useState({});
  const [googleReady, setGoogleReady] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validateEmail = (value) => {
    const isValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 100;
    return isValid ? '' : 'Enter a valid email address.';
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);

    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setErrors({});
    onNext();
  };

  const handleGoogleSuccess = async (response) => {
    setGoogleLoading(true);
    try {
      await dispatch(loginGoogle({ credential: response.credential })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login failed:', err);
      showAlert('Google login failed. Please try again.', 'error');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    showAlert('Google login was cancelled or failed.', 'error');
  };

return (
  <div className="w-full max-w-md mx-auto bg-stone-100 dark:bg-stone-900 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-6">
      Create your account
    </h2>

    <form onSubmit={handleContinue} className="space-y-4">
      <TextInput
        label="Email Address"
        name="email"
        type="email"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        error={errors.email}
        required
      />

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? <Loader size="sm" /> : 'Continue'}
      </Button>
    </form>

    {/* Login link */}
    <p className="mt-4 text-center text-sm text-stone-600 dark:text-stone-400">
      Already have an account?{' '}
      <Link
        to="/login"
        className="font-medium text-amber-500 dark:text-amber-400 hover:underline"
      >
        Login
      </Link>
    </p>

    {/* Divider */}
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-stone-300 dark:border-stone-700" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-stone-100 dark:bg-stone-900 px-2 text-stone-500 dark:text-stone-400">
          Or sign up with
        </span>
      </div>
    </div>

    {/* Google button */}
    <div className="flex justify-center">
      {googleLoading ? (
        <Button fullWidth disabled>
          <Loader size="sm" /> &nbsp; Signing in...
        </Button>
      ) : googleReady ? (
        <div className="w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
          />
        </div>
      ) : (
        <Button
          fullWidth
          variant="outline"
          className="border-stone-300 dark:border-stone-600 dark:text-stone-100"
          onClick={() => setGoogleReady(true)}
        >
          <FcGoogle size={20} className="mr-2" /> Continue with Google
        </Button>
      )}
    </div>
  </div>
);

};

export default EmailStep;

