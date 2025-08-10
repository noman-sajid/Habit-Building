// import React, { useState } from "react";
// import EmailStep from "../../components/auth/EmailStep";
// import PasswordStep from "../../components/auth/PasswordStep";
// import ProfileStep from "../../components/auth/ProfileStep";
// import { useDispatch } from "react-redux";
// import { register } from "../../reducers/authReducer"; // ✅ from reducer
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     avatar: null, // base64 or file object
//   });

//   const handleNext = () => setStep((prev) => prev + 1);
//   const handleBack = () => setStep((prev) => prev - 1);

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       await dispatch(register(formData)).unwrap(); // ✅ use thunk
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Registration failed:", error);
//     }
//   };

// return (
//   <div className="max-w-md mx-auto p-4">
//     <div className="bg-stone-100 dark:bg-stone-900 p-6 rounded-lg shadow-md">
//       {step === 1 && (
//         <EmailStep
//           email={formData.email}
//           onChange={(value) => handleChange("email", value)}
//           onNext={handleNext}
//         />
//       )}

//       {step === 2 && (
//         <PasswordStep
//           email={formData.email}
//           password={formData.password}
//           confirmPassword={formData.confirmPassword}
//           onPasswordChange={(value) => handleChange("password", value)}
//           onConfirmPasswordChange={(value) =>
//             handleChange("confirmPassword", value)
//           }
//           onNext={handleNext}
//           onBack={handleBack}
//         />
//       )}

//       {step === 3 && (
//         <ProfileStep
//           email={formData.email}
//           password={formData.password}
//           name={formData.name}
//           avatar={formData.avatar}
//           onNameChange={(value) => handleChange("name", value)}
//           onAvatarChange={(value) => handleChange("avatar", value)}
//           onSubmit={handleSubmit}
//           onBack={handleBack}
//         />
//       )}
//     </div>
//   </div>
// );

// };

// export default Register;







import React, { useState } from 'react';
import EmailStep from '../../components/auth/EmailStep';
import PasswordStep from '../../components/auth/PasswordStep';
import ProfileStep from '../../components/auth/ProfileStep';
import { useDispatch } from 'react-redux';
import { register } from '../../reducers/authReducer';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    avatar: null,
  });

  const handleNext = () => setStep((s) => Math.min(3, s + 1));
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(register(formData)).unwrap();
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      // show error UI as you prefer
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 px-4 py-10">
      {/* Card / step container */}
      <div className="w-full max-w-md bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-md">
        {/* Step header / indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-400">
            <div className="font-medium">
              Step {step} <span className="text-stone-400">of</span> 3
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors
                    ${step >= i ? 'bg-amber-500' : 'bg-stone-200 dark:bg-stone-600'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Steps */}
        {step === 1 && (
          <EmailStep
            email={formData.email}
            onChange={(value) => handleChange('email', value)}
            onNext={handleNext}
          />
        )}

        {step === 2 && (
          <PasswordStep
            email={formData.email}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            onPasswordChange={(value) => handleChange('password', value)}
            onConfirmPasswordChange={(value) => handleChange('confirmPassword', value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 3 && (
          <ProfileStep
            email={formData.email}
            password={formData.password}
            name={formData.name}
            avatar={formData.avatar}
            onNameChange={(value) => handleChange('name', value)}
            onAvatarChange={(value) => handleChange('avatar', value)}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
