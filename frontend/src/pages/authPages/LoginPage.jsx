// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { login, loginGoogle } from '../../reducers/authReducer';
// import { GoogleLogin } from '@react-oauth/google';

// function LoginPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//     setErrors({});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(login(formData)).unwrap();
//       navigate('/dashboard');
//     } catch (err) {
//       const message = err?.response?.data?.message || 'Login failed';
//       const lower = message.toLowerCase();

//       const fieldErrors = {};
//       if (lower.includes('email')) {
//         fieldErrors.email = 'Incorrect email';
//       } else if (lower.includes('password')) {
//         fieldErrors.password = 'Incorrect password';
//       } else {
//         fieldErrors.password = 'Login failed. Please try again.';
//       }

//       setErrors(fieldErrors);
//     }
//   };

//   const handleGoogleSuccess = async (response) => {
//     try {
//       await dispatch(loginGoogle({ credential: response.credential })).unwrap();
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Google login failed:', err);
//       setErrors({ password: 'Google login failed. Please try again.' });
//     }
//   };

//   const handleGoogleFailure = () => {
//     setErrors({ password: 'Google login was cancelled or failed.' });
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-stone-100 dark:bg-stone-900 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-stone-900 dark:text-stone-100">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-stone-700 dark:text-stone-200">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full mt-1 p-2 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-800 text-stone-900 dark:text-white"
//             required
//           />
//           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-stone-700 dark:text-stone-200">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full mt-1 p-2 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-800 text-stone-900 dark:text-white"
//             required
//           />
//           {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md shadow-sm"
//         >
//           Login
//         </button>
//       </form>

//       <div className="mt-6 flex flex-col items-center gap-4">
//         <span className="text-sm text-stone-500 dark:text-stone-400">or</span>
//         <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={handleGoogleFailure}
//           useOneTap
//         />
//       </div>
//     </div>
//   );
// }

// export default LoginPage;






import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, loginGoogle } from "../../reducers/authReducer";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import Loader from "../../components/common/Loader";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [googleReady, setGoogleReady] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(login(formData)).unwrap();
      navigate("/dashboard");
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed";
      const lower = message.toLowerCase();

      const fieldErrors = {};
      if (lower.includes("email")) {
        fieldErrors.email = "Incorrect email";
      } else if (lower.includes("password")) {
        fieldErrors.password = "Incorrect password";
      } else {
        fieldErrors.password = "Login failed. Please try again.";
      }

      setErrors(fieldErrors);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    setGoogleLoading(true);
    try {
      await dispatch(loginGoogle({ credential: response.credential })).unwrap();
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err);
      setErrors({ password: "Google login failed. Please try again." });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setErrors({ password: "Google login was cancelled or failed." });
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 px-4 py-10">
    <div className="w-full max-w-md bg-white dark:bg-stone-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>

      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500"
            required
          />
          {errors.email && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500"
            required
          />
          {errors.password && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md shadow-sm transition-colors disabled:opacity-70"
        >
          {loading ? <Loader size="sm" /> : "Login"}
        </button>
      </form>

      {/* Register link */}
      <p className="mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="font-medium text-amber-500 dark:text-amber-400 hover:underline">
          Sign up
        </Link>
      </p>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-300 dark:border-stone-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white dark:bg-stone-800 px-2 text-stone-500 dark:text-stone-400">
            Or login with
          </span>
        </div>
      </div>

      {/* Google button */}
      <div className="flex justify-center">
        {googleLoading ? (
          <button
            disabled
            className="w-full py-2 px-4 border border-stone-300 dark:border-stone-600 rounded-md flex items-center justify-center"
          >
            <Loader size="sm" /> &nbsp; Signing in...
          </button>
        ) : googleReady ? (
          <div className="w-full">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} useOneTap />
          </div>
        ) : (
          <button
            onClick={() => setGoogleReady(true)}
            className="w-full py-2 px-4 border border-stone-300 dark:border-stone-600 rounded-md flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition"
          >
            <FcGoogle size={20} className="mr-2" /> Continue with Google
          </button>
        )}
      </div>
    </div>
  </div>
);

}

export default LoginPage;
