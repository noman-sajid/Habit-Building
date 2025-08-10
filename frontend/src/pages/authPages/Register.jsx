import React, { useState } from "react";
import EmailStep from "../../components/auth/EmailStep";
import PasswordStep from "../../components/auth/PasswordStep";
import ProfileStep from "../../components/auth/ProfileStep";
import { useDispatch } from "react-redux";
import { register } from "../../reducers/authReducer"; // ✅ from reducer
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    avatar: null, // base64 or file object
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(register(formData)).unwrap(); // ✅ use thunk
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 1 && (
        <EmailStep
          email={formData.email}
          onChange={(value) => handleChange("email", value)}
          onNext={handleNext}
        />
      )}

      {step === 2 && (
        <PasswordStep
          email={formData.email}
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          onPasswordChange={(value) => handleChange("password", value)}
          onConfirmPasswordChange={(value) =>
            handleChange("confirmPassword", value)
          }
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
          onNameChange={(value) => handleChange("name", value)}
          onAvatarChange={(value) => handleChange("avatar", value)}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Register;
