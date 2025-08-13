// src/components/settings/ChangePasswordForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../../reducers/authReducer';
import Button from '../common/Button';
import TextInput from '../form/TextInput';

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserPassword({ oldPassword, newPassword }));
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Current Password"
        type="password"
        id="currentPassword"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
      />
      <TextInput
        label="New Password"
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;