import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { z } from 'zod';

interface EmailInputProps {
  placeholder?: string;
  initialValue?: string[];
  onChange?: (emails: string[]) => void;
  maxEmails?: number;
}

const emailSchema = z.string().email();

const EmailInput: React.FC<EmailInputProps> = ({
  placeholder,
  initialValue = [],
  onChange,
  maxEmails,
}) => {
  const [emails, setEmails] = useState<string[]>(initialValue);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (onChange) {
      onChange(emails);
    }
  }, [emails, onChange]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === 'Enter' || event.key === 'Tab') && input) {
      if (maxEmails !== undefined && emails.length >= maxEmails) {
        setError(`You can only add up to ${maxEmails} email addresses.`);
        return;
      }

      const validationResult = emailSchema.safeParse(input);
      if (validationResult.success) {
        setEmails((prevEmails) => {
          const newEmails = [...prevEmails, input];
          setInput('');
          setError(null);
          return newEmails;
        });
      } else {
        setError('Please enter a valid email address.');
      }
    }
  };

  const removeEmail = (index: number) => {
    setEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex flex-wrap items-start gap-2 p-2 border rounded min-h-[91px]">
        {emails.map((email, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-blue-50 border-[#676BC6] border-2 text-[#5D5E68] px-3 py-1 rounded-full"
          >
            {email}
            <button
              onClick={() => removeEmail(index)}
              className="text-blue-500 hover:text-blue-700 flex items-center"
            >
              <X />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="outline-none flex-1 min-w-[120px]"
          disabled={maxEmails !== undefined && emails.length >= maxEmails}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

EmailInput.displayName = 'EmailInput';

export { EmailInput };
