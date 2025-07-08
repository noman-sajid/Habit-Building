import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import { registerUser } from '../../actions/authActions';


const RegisterPage = () => {
  // const dispatch = useDispatch(); // Enable if needed for Redux actions

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!avatar) newErrors.avatar = 'Avatar is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('avatar', avatar);

    try {
      const user = await registerUser(data);
      console.log('Registered:', user);

      
      setFormData({ name: '', email: '', password: '' });
      setAvatar(null);
      setAvatarPreview(null);
      setErrors({});

      // TODO: dispatch(user) or navigate to dashboard if needed
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Something went wrong. Try again.';
      setErrors((prev) => ({ ...prev, backend: message }));
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Register
        </h2>

        {errors.backend && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errors.backend}
          </p>
        )}

        <TextInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          error={errors.name}
          required
        />

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
          placeholder="Enter a strong password"
          error={errors.password}
          required
        />

        {/* Avatar Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
          />
          {errors.avatar && (
            <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
          )}
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="mt-3 h-20 w-20 rounded-full object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
