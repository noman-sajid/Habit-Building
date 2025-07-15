import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../reducers/authReducer';
import TextInput from '../../components/form/TextInput';
import FileUpload from '../../components/form/FileUpload';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading} = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [localErrors, setLocalErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalErrors({ ...localErrors, [e.target.name]: '' });
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
      setLocalErrors(newErrors);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('avatar', avatar);

 try {
  const res = await dispatch(register(data)).unwrap();
  console.log('✅ Registered:', res);
  navigate('/dashboard');
} catch (err) {
  const message = err?.response?.data?.message || 'Registration failed';
  const lower = message.toLowerCase();
  const fieldErrors = {};

  if (lower.includes('user already exists') || lower.includes('email')) {
    fieldErrors.email = 'Email already exists';
  } else if (lower.includes('password')) {
    fieldErrors.password = 'Password is invalid';
  } else if (lower.includes('name')) {
    fieldErrors.name = 'Name is invalid';
  } else if (lower.includes('avatar')) {
    fieldErrors.avatar = 'Please select a valid avatar';
  } else {
    // Show under avatar field by default if it's a mystery error
    fieldErrors.avatar = 'Registration failed. Please try again.';
  }

  setLocalErrors(fieldErrors);
}



  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-md"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold font-poppins text-center mb-6 text-stone-900 dark:text-white">
          Join Habitium
        </h2>

       

        <TextInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          error={localErrors.name}
          required
        />

        <TextInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          error={localErrors.email}
          required
        />

        <TextInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Minimum 6 characters"
          error={localErrors.password}
          required
        />

        <FileUpload
          label="Avatar"
          onChange={handleAvatarChange}
          error={localErrors.avatar}
          preview={avatarPreview}
        />



        <Button
  type="submit"
  variant="primary"
  size="lg"
  className="mt-4 w-full"
  disabled={loading}
>
  {loading ? 'Registering...' : 'Register'}
</Button>

<p className="mt-4 text-center text-sm text-stone-700 dark:text-stone-300">
  Already have an account?{' '}
 <Link
  to="/login"
  className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
>
  Log in
</Link>

</p>

      </form>
    </div>
  );
};

export default RegisterPage;
