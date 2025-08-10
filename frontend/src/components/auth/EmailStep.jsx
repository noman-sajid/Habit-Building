import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginGoogle } from '../../reducers/authReducer';
import { FcGoogle } from 'react-icons/fc';
import TextInput from '../form/TextInput';
import Button from '../common/Button';
import { useAlert } from '../../context/AlertContext';
import { GoogleLogin } from '@react-oauth/google'; // ✅ Import the Google login component
import { useNavigate } from 'react-router-dom';

const EmailStep = ({ email, onChange, onNext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { loading } = useSelector((state) => state.auth);

  const [errors, setErrors] = useState({});

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

  // ✅ Same as LoginPage logic
  const handleGoogleSuccess = async (response) => {
    try {
      await dispatch(loginGoogle({ credential: response.credential })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login failed:', err);
      showAlert('Google login failed. Please try again.', 'error');
    }
  };

  const handleGoogleFailure = () => {
    showAlert('Google login was cancelled or failed.', 'error');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-stone-900 mb-6">
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
          Continue
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-stone-100 px-2 text-stone-500">
            Or sign up with
          </span>
        </div>
      </div>

      {/* ✅ Google OAuth Component */}
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap
        />
      </div>
    </div>
  );
};

export default EmailStep;
