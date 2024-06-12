import { useEffect, useRef } from 'react';

const useIdleTimer = (
  onIdle: () => void,
  timeout: number,
  warningCallback?: () => void,
  warningTime?: number
) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);

      if (warningCallback && warningTime) {
        warningRef.current = setTimeout(warningCallback, timeout - warningTime);
      }
      
      timerRef.current = setTimeout(onIdle, timeout);
    };

    const handleActivity = () => resetTimer();

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);

      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [onIdle, timeout, warningCallback, warningTime]);

  return timerRef.current;
};

export default useIdleTimer;
