import React, { useState, useRef, useEffect } from 'react';
import StepTitle from './steps/StepTitle';
import StepDescription from './steps/StepDescription';
import StepFrequency from './steps/StepFrequency';
import StepReview from './steps/StepReview';
import { useDispatch, useSelector } from 'react-redux';
import { addHabit } from '../../reducers/habitReducer';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import Loader from '../common/Loader';
import { AnimatePresence, motion } from 'framer-motion';

// Custom hook to handle dynamic height
function useResizeHeight(ref) {
  const [height, setHeight] = useState('auto');

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return height;
}

const CreateHabitForm = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    emoji: '',
    description: '',
    frequency: 'daily',
    customDays: [],
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { loading } = useSelector((state) => state.habits);

  const containerRef = useRef(null);
  const height = useResizeHeight(containerRef);

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(addHabit(formData)).unwrap();
      showAlert('Habit created successfully!', 'success');
      navigate('/dashboard');
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
            emoji={formData.emoji}
            setEmoji={(emoji) => handleChange('emoji', emoji)}
          />
        );
      case 2:
        return (
          <StepDescription
            value={formData.description}
            onChange={(val) => handleChange('description', val)}
            error={errors.description}
            title={formData.title}
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

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-8 bg-white dark:bg-stone-800 rounded-2xl shadow-xl transition-all duration-300">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-medium text-stone-400 dark:text-stone-500">
          {['Title', 'Motivation', 'Frequency', 'Review'].map((label, index) => (
            <span
              key={label}
              className={`transition-colors ${step === index + 1 ? 'text-stone-900 dark:text-white' : ''}`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="h-2 mt-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300 ease-out"
            style={{ width: `${(step - 1) * 33.33}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div
        className="relative transition-all duration-300 ease-in-out overflow-hidden"
        style={{ height }}
      >
        <div ref={containerRef}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="mt-6 flex justify-between items-center">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-5 py-2 rounded-lg shadow-sm transition-all duration-200"
          >
            Next
          </button>
        </div>
      )}

      {loading && <Loader className="mt-6 mx-auto w-6 h-6" />}
    </div>
  );
};

export default CreateHabitForm;
