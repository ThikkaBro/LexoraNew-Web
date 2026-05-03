import { useState, useCallback, useRef } from 'react';

export function useDebounce(callback, delay = 2000) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutRef = useRef(null);

  const debouncedFn = useCallback(
    async (...args) => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      try {
        const result = await callback(...args);
        return result;
      } finally {
        timeoutRef.current = setTimeout(() => {
          setIsSubmitting(false);
        }, delay);
      }
    },
    [callback, delay, isSubmitting]
  );

  return { debouncedFn, isSubmitting };
}
