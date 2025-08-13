// src/components/auth/UpdateProfileModal.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { User, X } from 'lucide-react';
import { updateUserProfile } from '../../reducers/authReducer';
import Button from '../common/Button';
import TextInput from '../form/TextInput';
import FileUpload from '../form/FileUpload';

const UpdateProfileModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    if (avatar) {
      formData.set('avatar', avatar);
    }
    dispatch(updateUserProfile(formData));
    closeModal();
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
        className="bg-white dark:bg-stone-800 rounded-xl shadow-lg w-full max-w-md relative"
      >
        <button onClick={closeModal} className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200">
          <X size={24} />
        </button>
        <div className="p-6">
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center"><User size={20} className="mr-2" /> Update Profile</h2>
            <TextInput
              label="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FileUpload
              label="Avatar"
              id="avatar-upload-modal"
              onChange={handleAvatarChange}
              avatarPreview={avatarPreview}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Save Profile'}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateProfileModal;
