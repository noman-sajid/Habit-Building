// src/components/settings/ChangeEmailForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestEmailUpdate } from '../../reducers/authReducer';
import Button from '../common/Button';
import TextInput from '../form/TextInput';

const ChangeEmailForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestEmailUpdate({ newEmail, currentPassword }));
    setNewEmail('');
    setCurrentPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="New Email"
        type="email"
        id="newEmail"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        required
      />
      <TextInput
        label="Current Password"
        type="password"
        id="currentPasswordForEmail"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Request Email Change'}
      </Button>
    </form>
  );
};

export default ChangeEmailForm;