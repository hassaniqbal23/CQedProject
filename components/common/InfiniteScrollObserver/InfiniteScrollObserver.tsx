import React, { useEffect, useRef, useCallback } from 'react';

interface InfiniteScrollObserverProps {
  onIntersect: () => void;
  isLoading: boolean;
}

const InfiniteScrollObserver: React.FC<InfiniteScrollObserverProps> = ({
  onIntersect,
  isLoading,
}) => {
  const observer = useRef<IntersectionObserver>();

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, onIntersect]
  );

  return <div ref={lastPostElementRef} />;
};

export default InfiniteScrollObserver;
