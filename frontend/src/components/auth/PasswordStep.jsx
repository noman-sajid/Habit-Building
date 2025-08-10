import React, { useState } from 'react';
import TextInput from '../form/TextInput';
import Button from '../common/Button';

const PasswordStep = ({ email, password, confirmPassword, onPasswordChange, onConfirmPasswordChange, onNext, onBack, loading }) => {
  const [error, setError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateConfirmPassword = (pass, confirmPass) => {
    if (!confirmPass) return 'Please confirm your password';
    if (pass !== confirmPass) return 'Passwords do not match';
    return '';
  };

  const handleContinue = () => {
    const passwordError = validatePassword(password);
    const confirmErrorMsg = validateConfirmPassword(password, confirmPassword);

    if (passwordError || confirmErrorMsg) {
      setError(passwordError);
      setConfirmError(confirmErrorMsg);
      return;
    }

    setError('');
    setConfirmError('');
    onNext();
  };

return (
  <div className="space-y-6">
    {/* Testing purposes */}
    <p className="text-sm text-stone-500 dark:text-stone-400">
      Entered email: {email}
    </p>

    <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-6">
      Set your password
    </h2>

    <TextInput
      label="Password"
      name="password"
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => onPasswordChange(e.target.value)}
      error={error}
      className="dark:bg-stone-700 dark:text-stone-100 dark:placeholder-stone-400"
    />

    <TextInput
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      placeholder="Re-enter your password"
      value={confirmPassword}
      onChange={(e) => onConfirmPasswordChange(e.target.value)}
      error={confirmError}
      className="dark:bg-stone-700 dark:text-stone-100 dark:placeholder-stone-400"
    />

    <div className="flex justify-between">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600"
      >
        Back
      </Button>
      <Button
        type="button"
        onClick={handleContinue}
        disabled={loading}
        className="bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-400 dark:hover:bg-amber-500"
      >
        Continue
      </Button>
    </div>
  </div>
);

};

export default PasswordStep;
