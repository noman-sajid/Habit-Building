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
      {/* TESTING PURPOSES ONLY */}
      <p className="text-sm text-gray-500">Entered email: {email}</p>

      <h2 className="text-2xl font-semibold text-stone-900 mb-6">
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
      />

      <TextInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        error={confirmError}
      />

      <div className="flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={handleContinue} disabled={loading}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PasswordStep;
