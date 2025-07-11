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
import Modal from '../components/feedback/Modal';
import Tabs from '../components/layout/tabs/tabs';
import VerticalTabs from '../components/layout/tabs/VerticalTabs';
import ToggleGroup from '../components/layout/tabs/ToggleGroup';


const LandingPage = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [habitImage, setHabitImage] = useState(null);
  const [habitFrequency, setHabitFrequency] = useState('');
  const [reminder, setReminder] = useState(false);
 const [selectedTab, setSelectedTab] = useState('Overview');
 const [selectedVerticalTab, setSelectedVerticalTab] = useState('Overview');
 const [selectedToggle, setSelectedToggle] = useState('Weekly');




  const [isModalOpen, setIsModalOpen] = useState(false);

const handleConfirm = () => {
  console.log('User confirmed!');
  setIsModalOpen(false);
};

const handleCancel = () => {
  console.log('User cancelled!');
  setIsModalOpen(false);
};


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

      <Button
  onClick={() => setIsModalOpen(true)}
  variant="secondary"
  size="sm"
  className="mt-2"
>
  Open Modal
</Button>

<Modal
  isOpen={isModalOpen}
  title="Confirm Habit Creation"
  showActions
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>

{/* ───────── Tabs Demo Section ───────── */}
<div className="w-full max-w-md space-y-8 mt-8">

  {/* Horizontal Tabs */}
  <div className="bg-white dark:bg-stone-800 rounded-lg shadow p-4">
    <h2 className="text-lg font-semibold mb-4 text-stone-800 dark:text-stone-200">Horizontal Tabs</h2>
 <Tabs
  tabs={[
    {
      label: 'Overview',
      content: (
        <div> {/* JSX is now supported */}
          <h3>Welcome back!</h3>
          <p>You have 4 habits in progress.</p>
        </div>
      ),
    },
    {
      label: 'Progress',
      content: (
        <ul>
          <li>✅ Woke up early</li>
          <li>✅ 10 pushups</li>
          <li>❌ Missed journaling</li>
        </ul>
      ),
    },
    {
      label: 'Settings',
      content: (
        <ToggleGroup
          options={['Daily', 'Weekly', 'Monthly']}
          selected="Weekly"
          onChange={(val) => console.log('Settings changed:', val)}
        />
      ),
    },
  ]}
  selected="Overview"
  onTabChange={(label) => console.log('Switched tab:', label)}
/>


  </div>

  {/* Vertical Tabs */}
  <div className="bg-white dark:bg-stone-800 rounded-lg shadow p-4">
    <h2 className="text-lg font-semibold mb-4 text-stone-800 dark:text-stone-200">Vertical Tabs</h2>
    <VerticalTabs
  tabs={[
    { label: 'Overview', content: 'Overview in vertical tab.' },
    { label: 'Logs', content: 'Check your habit logs.' },
    { label: 'Config', content: 'Configure vertical settings here.' },
  ]}
  selected={selectedVerticalTab}
  onTabChange={(label) => setSelectedVerticalTab(label)}
/>

  </div>

  {/* Toggle Group */}
  <div className="bg-white dark:bg-stone-800 rounded-lg shadow p-4">
    <h2 className="text-lg font-semibold mb-4 text-stone-800 dark:text-stone-200">Toggle Group</h2>
    <ToggleGroup
  options={['Daily', 'Weekly', 'Monthly']}
  selected={selectedToggle}
  onChange={(val) => setSelectedToggle(val)}
/>

  </div>

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
