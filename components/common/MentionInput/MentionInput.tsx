import { Avatar, AvatarImage } from '@/components/ui';
import React, { FormEvent } from 'react';
import { MentionsInput, Mention } from 'react-mentions';

interface MentionInputProps {
  value: string;
  onChange: (
    e: any,
    newValue: string,
    newPlainTextValue: string,
    mentions: any[]
  ) => void;
  onKeyDown?: (
    event:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  mentionSuggestions?: {
    id: string | number;
    display: string;
    image?: string | null;
  }[];
}

function MentionInput({
  mentionSuggestions,
  onChange,
  value,
  onKeyDown,
  ...props
}: MentionInputProps) {
  return (
    <MentionsInput
      placeholder={props.placeholder}
      onKeyDown={onKeyDown}
      value={value}
      className="mention-input flex-grow border-none p-2 rounded-full bg-gray-100"
      onChange={onChange}
      style={{
        input: {
          border: 'none',
          outline: 'none',
          padding: '10px',
          margin: 0,
          boder: '1px solid #ccc',
        },
        suggestions: {
          top: '5px',
          marginTop: '25px',
          list: {
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: '14px',
            top: '5px',
          },
          item: {
            padding: '1px 5px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
              backgroundColor: '#2183c4',
              color: 'white',
            },
            '&hover': {
              backgroundColor: '#1570ac',
            },
          },
        },
        control: {
          backgroundColor: 'transparent',
          fontSize: 14,
          lineHeight: 1.5,
        },
      }}
      a11ySuggestionsListLabel="Suggestion list is now open. Use up and down arrow to navigate, press Enter to select the suggestion."
    >
      <Mention
        trigger="@"
        appendSpaceOnAdd={true}
        className="mention"
        data={mentionSuggestions || []}
        renderSuggestion={(
          suggestion,
          search,
          highlightedDisplay,
          index,
          focused
        ) => (
          <div className={`mention-suggestion flex gap-2 items-center`}>
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={
                  (suggestion as any).image
                    ? (suggestion as any).image
                    : '/avatar1.svg'
                }
              />
            </Avatar>
            <span>{suggestion.display}</span>
          </div>
        )}
        displayTransform={(id, display) => `@${display}`}
        style={{
          backgroundColor: 'transparent',
          fontWeight: '800',
        }}
      />
    </MentionsInput>
  );
}

export { MentionInput };
