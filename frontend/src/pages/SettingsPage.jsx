// src/pages/SettingsPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Shield, Mail } from 'lucide-react';
import ChangePasswordForm from '../components/settings/ChangePasswordForm';
import ChangeEmailForm from '../components/settings/ChangeEmailForm';
import PageLayout from '../components/layout/PageLayout';

const SettingsPage = () => {
  const { user } = useSelector((state) => state.auth);

  // User logged in with Google, so password/email changes are disabled.
  const isGoogleUser = !!user?.googleId;

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="space-y-12">
          {/* Change Password Section */}
          <section>
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <Shield size={20} className="mr-2" /> Change Password
            </h2>
            {isGoogleUser ? (
              <p className="text-sm text-stone-500 dark:text-stone-400">
                You are logged in with Google and cannot change your password here.
              </p>
            ) : (
              <ChangePasswordForm />
            )}
          </section>

          {/* Change Email Section */}
          <section>
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <Mail size={20} className="mr-2" /> Change Email
            </h2>
            {isGoogleUser ? (
               <p className="text-sm text-stone-500 dark:text-stone-400">
                Changing email is not supported for Google accounts at this time.
              </p>
            ) : (
              <ChangeEmailForm />
            )}
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;