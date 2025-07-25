import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgot } from '../../reducers/authReducer';
import TextInput from '../../components/form/TextInput';
import Button from '../../components/common/Button';
import { useAlert } from '../../context/AlertContext';
import Loader from '../../components/common/Loader';
import { useNavigate } from 'react-router-dom';


const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const action = await dispatch(forgot(email));
    console.log('[ForgotPasswordPage] Dispatch result:', action);

    if (forgot.fulfilled.match(action)) {
      const message = action.payload?.message || 'Password reset email sent.';
      showAlert(message, 'success');
       navigate('/password-reset-sent');
    } else {
      const errorMsg = action.payload || 'Unexpected error occurred.';
      showAlert(errorMsg, 'error');
    }
  } catch (err) {
    console.error('[ForgotPasswordPage] Catch error:', err);
    showAlert(err.message || 'Something went wrong.', 'error');
  } finally {
    setLoading(false); // ✅ Always re-enable the button
  }
};





  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-stone-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
          Forgot Password
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-300 mb-6">
          Enter your email to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
          />
         <Button type="submit" disabled={loading} className="w-full">
  {loading ? <Loader className="mx-auto w-5 h-5" /> : 'Send Reset Link'}
</Button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
