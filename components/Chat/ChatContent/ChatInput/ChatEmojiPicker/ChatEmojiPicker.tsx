'use-client';

import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import { BaseEmojiProps } from 'emoji-picker-react/dist/components/emoji/BaseEmojiProps';

interface IChatEmojiPickerProps {
  open: boolean;
  button: React.ReactNode;
  onPickEmoji: (emoji: any) => void;
}

function ChatEmojiPicker({ open, button, onPickEmoji }: IChatEmojiPickerProps) {
  return (
    <div className="relative">
      <div className="absolute right-1 bottom-9 z-50">
        <EmojiPicker open={open} onEmojiClick={(emoji) => onPickEmoji(emoji)} />
      </div>
      {button}
    </div>
  );
}

export { ChatEmojiPicker };
