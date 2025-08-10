import React, { useRef, useState } from "react";
import TextInput from "../form/TextInput";
import Button from "../common/Button";

const ProfileStep = ({
  email,
  password,
  name,
  avatar,
  onNameChange,
  onAvatarChange,
  onBack,
  onSubmit,
  loading,
}) => {
  const avatarRef = useRef(null);
  const [preview, setPreview] = useState(
    avatar && typeof avatar === "string" ? avatar : null
  );
  const [error, setError] = useState("");
  const [avatarError, setAvatarError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onAvatarChange(file);
      setAvatarError("");
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    avatarRef.current?.click();
  };

  const handleFinish = () => {
    let valid = true;

    if (!name || name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      valid = false;
    } else {
      setError("");
    }

    if (!avatar) {
      setAvatarError("Avatar is required");
      valid = false;
    } else {
      setAvatarError("");
    }

    if (!valid) return;

    onSubmit();
  };

return (
  <div className="space-y-6">
    {/* Testing purposes */}
    <p className="text-sm text-stone-500 dark:text-stone-400">
      Entered email: {email}
    </p>
    <p className="text-sm text-stone-500 dark:text-stone-400">
      Entered password: {"*".repeat(password.length)}
    </p>

    <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-6">
      Tell us about yourself
    </h2>

    <TextInput
      name="name"
      label="Your Name"
      placeholder="Enter your name"
      value={name}
      onChange={(e) => onNameChange(e.target.value)}
      error={error}
      className="dark:bg-stone-700 dark:text-stone-100 dark:placeholder-stone-400"
    />

    <div className="space-y-2">
      <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
        Avatar
      </label>
      <div
        className="w-24 h-24 rounded-full overflow-hidden border border-stone-300 dark:border-stone-600 cursor-pointer flex items-center justify-center bg-stone-100 dark:bg-stone-700"
        onClick={handleClickUpload}
      >
        {preview ? (
          <img
            src={preview}
            alt="Avatar Preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-sm text-stone-500 dark:text-stone-300">
            Upload
          </span>
        )}
      </div>
      <input
        ref={avatarRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      {avatarError && (
        <p className="text-sm text-red-500 dark:text-red-400">{avatarError}</p>
      )}
    </div>

    <div className="flex justify-between items-center pt-4">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600"
      >
        Back
      </Button>
      <Button
        type="button"
        onClick={handleFinish}
        disabled={loading}
        className="bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-400 dark:hover:bg-amber-500"
      >
        {loading ? "Submitting..." : "Finish"}
      </Button>
    </div>
  </div>
);

};

export default ProfileStep;
