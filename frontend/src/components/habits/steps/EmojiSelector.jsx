import React from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiSelector = ({ onEmojiClick, onClose }) => {
  return (
    <div className="flex flex-col gap-2 items-center p-2">
      <EmojiPicker
        onEmojiClick={(e) => {
          onEmojiClick(e);
          onClose();
        }}
        autoFocusSearch={false}
        height={350}
      />
    </div>
  );
};

export default EmojiSelector;
