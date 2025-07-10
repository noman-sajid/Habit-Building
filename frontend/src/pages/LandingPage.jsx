import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ProfileAvatar from '../components/common/ProfileAvatar';
import { useAlert } from '../context/AlertContext';
import TextInput from '../components/form/TextInput';
import TextArea from '../components/form/TextArea';
import FileUpload from '../components/form/FileUpload';
import Select from '../components/form/Select';
import Checkbox from '../components/form/Checkbox';


const LandingPage = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [habitImage, setHabitImage] = useState(null);
  const [habitFrequency, setHabitFrequency] = useState('');
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Habit Name:', habitName);
    console.log('Habit Description:', habitDescription);
    console.log('Habit Image:', habitImage);
    console.log('Habit Frequency:', habitFrequency);
    console.log('Reminder:', reminder);

    showAlert({
      type: 'success',
      message: 'Habit info logged to console!',
    });
  };

  const handleRegister = () => {
    showAlert({
      type: 'info',
      message: 'Redirecting to Register page...',
      duration: 5000,
    });

    setTimeout(() => {
      navigate('/register');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 flex flex-col px-4">
     

      <div className="flex flex-col items-center justify-center space-y-4 mt-8">
        <Card className="text-center w-full max-w-md">
          <div className="flex justify-center mb-4">
            <ProfileAvatar
              src="/images/smallProfile.png"
              alt="Welcome Avatar"
              size="lg"
            />
          </div>

          <h1
            className="text-4xl font-poppins font-bold text-primary dark:text-accent mb-4"
            aria-label="Welcome to Hibo"
          >
            Welcome to Hibo
          </h1>

          <p className="text-lg font-inter text-stone-900 dark:text-stone-100">
            Your habit journey begins here.
          </p>

          <Button
            onClick={handleRegister}
            variant="primary"
            size="md"
            className="mt-6"
          >
            Get Started
          </Button>
        </Card>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4 bg-white dark:bg-stone-800 rounded-2xl shadow-light dark:shadow-dark p-6"
        >
          <TextInput
            label="Habit Name"
            name="habitName"
            placeholder="Enter your habit name"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
          <TextArea
            label="Habit Description"
            name="habitDescription"
            placeholder="Why is this habit important?"
            value={habitDescription}
            onChange={(e) => setHabitDescription(e.target.value)}
          />
          <FileUpload
            label="Habit Image"
            name="habitImage"
            onChange={(e) => setHabitImage(e.target.files?.[0] || null)}
          />
          <Select
            label="Select Habit Frequency"
            name="habitFrequency"
            value={habitFrequency}
            onChange={(e) => setHabitFrequency(e.target.value)}
            options={[
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
            placeholder="How often will you do this?"
          />
          <Checkbox
            label="Remind me daily"
            name="reminder"
            checked={reminder}
            onChange={(e) => setReminder(e.target.checked)}
          />
          <div className="pt-2">
            <Button type="submit" variant="primary" size="md">
              Submit Habit
            </Button>
          </div>
        </form>
      </div>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 space-y-3 w-full max-w-sm px-4">
        {/* Alert container for global alerts */}
        <div className="animate-zoom-fade-out p-4 bg-red-100 border border-red-300 rounded-md">
          Test Zoom Out
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
