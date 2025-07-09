// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '../components/common/Button';
// import Card from '../components/common/Card';
// import ProfileAvatar from '../components/common/ProfileAvatar';
// // import Loader from '../components/common/Loader'; 
// import  Alert from '../components/common/Alert'; 

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-stone-100 dark:bg-stone-900 flex items-center justify-center px-4">
//       <Card className="text-center w-full max-w-md">
//         {/* Avatar */}
//         <div className="flex justify-center mb-4">
//           <ProfileAvatar
//             src="/images/smallProfile.png"
//             alt="Welcome Avatar"
//             size="lg"
//           />
//         </div>

//         {/* Heading */}
//         <h1
//           className="text-4xl font-poppins font-bold text-primary dark:text-accent mb-4"
//           aria-label="Welcome to Hibo"
//         >
//           Welcome to Hibo
//         </h1>

//         {/* Subtext */}
//         <p className="text-lg font-inter text-stone-900 dark:text-stone-100">
//           Your habit journey begins here.
//         </p>

//         {/* Button */}
//         <Button
//           onClick={() => navigate('/register')}
//           variant="primary"
//           size="md"
//           className="mt-6"
//         >
//           Get Started
//         </Button>

//         {/* Loader below the button */}
//         {/* <div className="mt-6 flex justify-center">
//           <Loader size="md" />
//         </div> */}
//       </Card>

      
//     </div>
//   );
// };

// export default LandingPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ProfileAvatar from '../components/common/ProfileAvatar';
import { useAlert } from '../context/AlertContext'; // ✅ useAlert from context

const LandingPage = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert(); // ✅ use global alert handler

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
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 flex flex-col items-center justify-center px-4 space-y-4">
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
  <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 space-y-3 w-full max-w-sm px-4">
        {/* Alert container for global alerts */}
        {/* Alerts will be rendered here by the AlertContext */}
        <div className="animate-zoom-fade-out p-4 bg-red-100 border border-red-300 rounded-md">
  Test Zoom Out
</div>

      </div>

    </div>
  );
};

export default LandingPage;
