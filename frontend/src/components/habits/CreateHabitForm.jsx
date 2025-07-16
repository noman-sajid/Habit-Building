import React, { useState } from 'react';
import StepTitle from './steps/StepTitle';
import StepDescription from './steps/StepDescription';
import StepFrequency from './steps/StepFrequency';
import StepReview from './steps/StepReview';
import { useDispatch, useSelector } from 'react-redux';
import { addHabit } from '../../reducers/habitReducer';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import Loader from '../common/Loader';

const CreateHabitForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    frequency: 'daily',
    customDays: [],
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { loading } = useSelector((state) => state.habits);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async () => {
    try {
      const res = await dispatch(addHabit(formData)).unwrap();
      showAlert('Habit created successfully!', 'success');
      navigate('/dashboard'); // or wherever you want to go
    } catch (error) {
      showAlert(error || 'Failed to create habit', 'error');
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1 && !formData.title) newErrors.title = 'Please enter or select a title.';
    if (step === 2 && !formData.description) newErrors.description = 'Please provide motivation.';
    if (step === 3) {
      if (!formData.frequency) newErrors.frequency = 'Please select frequency.';
      if (formData.frequency === 'custom' && formData.customDays.length === 0)
        newErrors.customDays = 'Select at least one day.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) nextStep();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepTitle
            value={formData.title}
            onChange={(val) => handleChange('title', val)}
            error={errors.title}
          />
        );
      case 2:
        return (
          <StepDescription
            value={formData.description}
            onChange={(val) => handleChange('description', val)}
            error={errors.description}
          />
        );
      case 3:
        return (
       <StepFrequency
  value={formData.frequency}
  onChange={(val) => handleChange('frequency', val)}
  error={errors}
  customDays={formData.customDays}
  onCustomDaysChange={(days) => handleChange('customDays', days)}
/>


        );
      case 4:
        return (
          <StepReview
            formData={formData}
            onBack={prevStep}
            onSubmit={handleSubmit}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-stone-800 rounded-2xl shadow">
      <div className="mb-4">
        <p className="text-stone-600 dark:text-stone-300 text-sm">
          Step {step} of 4
        </p>
      </div>

      {renderStep()}

      {step < 4 && (
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="text-sm text-stone-500 hover:text-stone-700 dark:hover:text-white"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          >
            Next
          </button>
        </div>
      )}

      {loading && <Loader className="mt-4 mx-auto w-6 h-6" />}
    </div>
  );
};

export default CreateHabitForm;
