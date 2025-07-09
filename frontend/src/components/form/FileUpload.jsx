import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';

const FileUpload = ({
  label,
  name,
  accept = 'image/*',
  onChange,
  required = false,
  error = '',
}) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onChange && onChange(e);
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = null;
    onChange && onChange({ target: { name, files: [] } });
  };

  return (
    <div className="mb-4 w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium mb-2 text-stone-700 dark:text-stone-200"
        >
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        required={required}
        className={`
          block w-full text-sm text-stone-700 dark:text-stone-200
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-medium
          file:bg-amber-100 file:text-amber-800
          hover:file:bg-amber-200
          dark:file:bg-amber-200 dark:file:text-amber-900 dark:hover:file:bg-amber-300
          border border-stone-300 dark:border-stone-700 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-primary
          transition-all
        `}
      />

      {error && (
        <p className="text-danger text-sm mt-1">{error}</p>
      )}

      {preview && (
        <div className="relative mt-3 w-10 h-10">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg border shadow-sm border-stone-300 dark:border-stone-700"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 focus:outline-none"
            title="Remove"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
