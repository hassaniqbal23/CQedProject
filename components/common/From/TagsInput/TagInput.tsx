import { X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
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

  const prevEmailsRef = useRef(emails);
  useEffect(() => {
    if (
      onChange &&
      JSON.stringify(emails) !== JSON.stringify(prevEmailsRef.current)
    ) {
      onChange(emails);
      prevEmailsRef.current = emails;
    }
  }, [emails, onChange]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === 'Enter' || event.key === 'Tab') && input.trim()) {
      event.preventDefault();
      if (maxEmails !== undefined && emails.length >= maxEmails) {
        setError(`You can only add up to ${maxEmails} email addresses.`);
        return;
      }

      const validationResult = emailSchema.safeParse(input.trim());
      if (validationResult.success) {
        setEmails((prevEmails) => [...prevEmails, input.trim()]);
        setInput('');
        setError(null);
      } else {
        setError('Please enter a valid email address.');
      }
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-start gap-2 p-2 border rounded min-h-[91px]">
        {emails.map((email, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-blue-50 border-[#676BC6] border text-sm text-[#5D5E68] px-3 py-1 rounded-full"
          >
            {email}
            <button
              onClick={() =>
                setEmails((prevEmails) =>
                  prevEmails.filter((_, i) => i !== index)
                )
              }
              className="text-blue-500 hover:text-blue-700 flex items-center"
            >
              <X size={14} />
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
