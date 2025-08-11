// src/components/auth/UpdateProfileModal.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { User, Key, Mail, X } from 'lucide-react';
import { updateUserProfile, updateUserPassword, requestEmailUpdate } from '../../reducers/authReducer';

const UpdateProfileModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    if (avatar) {
      formData.set('avatar', avatar);
    }
    dispatch(updateUserProfile(formData));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserPassword({ currentPassword, newPassword }));
  };

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    dispatch(requestEmailUpdate({ email: newEmail }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white dark:bg-stone-800 rounded-xl shadow-lg w-full max-w-lg relative"
      >
        <button onClick={closeModal} className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200">
          <X size={24} />
        </button>
        <div className="p-6 space-y-6">
          {/* Update Profile Form */}
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center"><User size={20} className="mr-2" /> Update Profile</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-600 dark:text-stone-300">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-lg bg-stone-50 dark:bg-stone-700 border-stone-300 dark:border-stone-600" />
            </div>
            <div>
              <label htmlFor="avatar-upload-modal" className="block text-sm font-medium text-stone-600 dark:text-stone-300">Avatar</label>
              <div className="flex items-center space-x-4">
                <img src={avatarPreview} alt="Avatar preview" className="w-16 h-16 rounded-full object-cover" />
                <input id="avatar-upload-modal" type="file" onChange={handleAvatarChange} className="text-sm" />
              </div>
            </div>
            <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600" disabled={loading}>
              {loading ? 'Updating...' : 'Save Profile'}
            </button>
          </form>

          {/* Update Password Form */}
          <form onSubmit={handlePasswordUpdate} className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-700">
            <h2 className="text-xl font-semibold flex items-center"><Key size={20} className="mr-2" /> Change Password</h2>
            <div>
              <label htmlFor="currentPassword"  className="block text-sm font-medium text-stone-600 dark:text-stone-300">Current Password</label>
              <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full p-2 border rounded-lg bg-stone-50 dark:bg-stone-700 border-stone-300 dark:border-stone-600" />
            </div>
            <div>
              <label htmlFor="newPassword"  className="block text-sm font-medium text-stone-600 dark:text-stone-300">New Password</label>
              <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 border rounded-lg bg-stone-50 dark:bg-stone-700 border-stone-300 dark:border-stone-600" />
            </div>
            <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>

          {/* Update Email Form */}
          <form onSubmit={handleEmailUpdate} className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-700">
            <h2 className="text-xl font-semibold flex items-center"><Mail size={20} className="mr-2" /> Change Email</h2>
            <div>
              <label htmlFor="newEmail" className="block text-sm font-medium text-stone-600 dark:text-stone-300">New Email</label>
              <input type="email" id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full p-2 border rounded-lg bg-stone-50 dark:bg-stone-700 border-stone-300 dark:border-stone-600" />
            </div>
            <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600" disabled={loading}>
              {loading ? 'Sending...' : 'Request Email Change'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateProfileModal;
