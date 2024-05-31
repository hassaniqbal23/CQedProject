import React, { useState } from 'react';

export const ExpandableText = ({
  text,
  maxLength,
  className,
}: {
  text: string;
  maxLength: number;
  className?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text?.length <= maxLength) {
    return <p className={className}>{text}</p>;
  }

  return (
    <div className={isExpanded ? '' : 'flex'}>
      <p className={`${className}`}>
        {isExpanded ? text : `${text?.substring(0, maxLength).trim()}`}
      </p>
      <span
        className="text-sm font-normal cursor-pointer hover:text-primary-500 ml-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'show less' : '...'}
      </span>
    </div>
  );
};

ExpandableText.display = 'ExpandableText';
