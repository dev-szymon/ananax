import { useEffect } from 'react';

export const useClick = (ref: any, callback: any) => {
  const handleClick: EventListenerOrEventListenerObject = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
