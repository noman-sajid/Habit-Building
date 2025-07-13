import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import mascot from '../assets/HiboMascot-1.png';

const features = [
    {
        title: 'Track Progress',
        description:
            'Monitor your daily habits and see your progress over time with intuitive charts.',
        icon: (
            <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0-10a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
        ),
    },
    {
        title: 'Earn Streaks',
        description:
            'Stay motivated by building and maintaining impressive habit streaks and achievements.',
        icon: (
            <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        title: 'Set Smart Goals',
        description:
            'Define clear, achievable goals and break them down into manageable daily habits.',
        icon: (
            <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-6 0a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16l-4-4-4 4" />
            </svg>
        ),
    },
];

const Home = () => {
    return (
        <main className="min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 px-6 sm:px-8 lg:px-16 py-12">
            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto pt-10 pb-14 px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                {/* Text Content - Left */}
                <div className="z-10 px-2 md:px-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold font-poppins mb-4 leading-normal
 text-stone-900 dark:text-white">
                        Your habit journey <span className="text-primary dark:text-accent leading-normal">begins here</span>.
                    </h1>

                    {/* Tagline */}
                    <p className="text-xl md:text-2xl font-semibold font-poppins text-primary dark:text-accent mb-4">
                        Habitium — the element of building habits
                    </p>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl font-inter mb-8 text-gray-700 dark:text-white">
                        Track your progress, build powerful streaks, and achieve your goals with ease.
                    </p>

                    <Button
                        variant="primary"
                        size="lg"
                        className="text-lg font-semibold"
                        onClick={() => window.location.href = '/register'}
                    >
                        Get Started
                    </Button>
                </div>

                {/* Mascot Image - Right */}
                <div className="z-0 flex justify-center md:justify-end px-2 md:px-6">
                    <img
                        src={mascot}
                        alt="Hibo the Habit Mascot"
                        className="max-w-md w-full drop-shadow-xl"
                    />
                </div>
            </section>


            {/* Features Section */}
            <section className="max-w-7xl mx-auto py-16 ">
                <h2 className="text-4xl font-bold font-poppins text-center mb-12">
                    Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                    {features.map((feature, idx) => (
                        <Card key={idx} className="text-center p-8 rounded-2xl shadow-lg">
                            <div className="flex justify-center mb-6">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold font-poppins mb-3 text-stone-800 dark:text-stone-100">
                                {feature.title}
                            </h3>
                            <p className="text-lg font-inter text-gray-700 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Why Habitium Section */}
<section className="bg-stone-200 dark:bg-stone-800 py-24 px-6 -mx-6 sm:-mx-8 lg:-mx-16 text-center">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 leading-10 text-stone-800 dark:text-white">
      Habitium isn’t here to push you — it’s here to walk with you.
    </h2>
    <p className="text-lg md:text-xl font-inter text-gray-700 dark:text-gray-300">
      Real change doesn’t come from pressure. It comes from presence, clarity, and compassion. That’s what we build into every pixel.
    </p>
  </div>
</section>

{/* Why it Wors -Psychology Based */}
<section className="bg-white dark:bg-stone-900 py-16 px-4 -mx-6 sm:-mx-8 lg:-mx-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4 sm:px-8">
    {/* Left: Mascot Image */}
    <div className="flex justify-center md:justify-center">
      <img
        src={mascot}
        alt="Psychology Backed Mascot"
        className="max-w-x w-full drop-shadow-xl"
      />
    </div>

    {/* Right: Text Content */}
    <div className="text-left md:text-left mr-24">
      <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 text-stone-900 dark:text-white">
        Why it works — backed by psychology
      </h2>
      <p className="text-lg md:text-xl font-inter text-gray-700 dark:text-gray-300 mb-6">
        Habitium isn’t based on hustle culture. It’s built on science — the psychology of behavior, motivation, and long-term change.
      </p>
      <ul className="space-y-3 text-left">
        <li className="flex items-start gap-2">
          <span className="text-primary dark:text-accent">✔</span>
          <span>Triggers, cues, and habit loops designed intentionally.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary dark:text-accent">✔</span>
          <span>Gentle reminders, not guilt-driven notifications.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary dark:text-accent">✔</span>
          <span>Celebrate consistency, not perfection.</span>
        </li>
      </ul>
    </div>
  </div>
</section>

{/* It’s a journey, not perfection */}
<section className="bg-neutral dark:bg-stone-900 py-16 px-4 -mx-6 sm:-mx-8 lg:-mx-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4 sm:px-8">
    
    {/* Left: Text Content */}
    <div className="text-left md:text-left md:pr-8">
      <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 text-primary dark:text-secondary">
        It’s a journey — not perfection
      </h2>
      <p className="text-lg md:text-xl font-inter text-gray-700 dark:text-gray-300 mb-6">
        Most apps expect you to be perfect. But change doesn’t work that way. Habitium expects you to be human.
      </p>
      <ul className="space-y-3">
        <li className="flex items-start gap-2">
          <span className="text-primary dark:text-accent">✔</span>
          <span>Missed a day? No problem — we track progress, not guilt.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary dark:text-accent">✔</span>
          <span>Restarting isn’t failure. It’s part of the process.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary dark:text-accent">✔</span>
          <span>Habitium celebrates effort, not pressure.</span>
        </li>
      </ul>
    </div>

    {/* Right: Mascot Image */}
    <div className="flex justify-center md:justify-center">
      <img
        src={mascot}
        alt="Mascot on the journey"
        className="max-w-x w-full drop-shadow-xl"
      />
    </div>
  </div>
</section>

{/*It adapts with your ups and downs*/}
<section className="bg-white dark:bg-stone-800 py-16 px-4 -mx-6 sm:-mx-8 lg:-mx-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4 sm:px-8">
    
    {/* Left: Mascot Image */}
    <div className="flex justify-center md:justify-center">
      <img
        src={mascot}
        alt="Hibo adjusting to ups and downs"
        className="max-w w-full drop-shadow-xl"
      />
    </div>

    {/* Right: Text Content */}
    <div className="text-left md:pl-8">
      <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 text-stone-900 dark:text-white">
        It adapts with your ups and downs
      </h2>
      <p className="text-lg md:text-xl font-inter text-gray-700 dark:text-gray-300 mb-6">
        Life changes — and your habit system should change with it. Habitium is built to flex, pivot, and grow alongside you.
      </p>
      <ul className="space-y-3">
        <li className="flex items-start gap-2">
          <span className="text-primary dark:text-accent">✔</span>
          <span>Adjust your pace and frequency at any time.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary dark:text-accent">✔</span>
          <span>Track breaks as part of your progress — not a failure.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary dark:text-accent">✔</span>
          <span>Reflections and nudges help you realign when needed.</span>
        </li>
      </ul>
    </div>
  </div>
</section>

{/*CTA section */}
<section className="relative bg-primary dark:bg-accent text-white dark:text-stone-900 py-20 px-4 -mx-6 sm:-mx-8 lg:-mx-16">
  <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
    <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
      Ready to start your habit journey?
    </h2>
    <p className="text-lg md:text-xl font-inter mb-8">
      Join Habitium today and start building consistent habits — your future self will thank you.
    </p>
    <Button
      variant="stoned"
      size="lg"
      className="text-lg font-semibold bg-white text-primary hover:bg-gray-100 dark:bg-white dark:text-accent"
      onClick={() => window.location.href = '/register'}
    >
      Join Habitium
    </Button>
  </div>
</section>



        </main>
    );
};

export default Home;
