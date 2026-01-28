import { useState, useEffect, useRef } from 'react';

interface ExamTimerProps {
  timeLimit: number; // in minuti
  examId: string;
  onTimeUp: () => void;
  isActive: boolean; // Timer attivo o in pausa
}

export default function ExamTimer({ timeLimit, examId, onTimeUp, isActive }: ExamTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(() => {
    // Carica il tempo salvato da localStorage
    const saved = localStorage.getItem(`timer_${examId}`);
    return saved ? parseInt(saved, 10) : timeLimit * 60; // Converti minuti in secondi
  });

  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Salva il tempo rimanente in localStorage
  useEffect(() => {
    localStorage.setItem(`timer_${examId}`, timeRemaining.toString());
  }, [timeRemaining, examId]);

  // Gestione del countdown
  useEffect(() => {
    if (!isActive || isExpired) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isExpired, onTimeUp]);

  // Formatta il tempo in MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Determina il colore in base al tempo rimanente
  const getTimerColor = (): string => {
    const percentage = (timeRemaining / (timeLimit * 60)) * 100;
    if (percentage > 50) return '#22c55e'; // verde
    if (percentage > 20) return '#f59e0b'; // arancione
    return '#ef4444'; // rosso
  };

  const resetTimer = () => {
    setTimeRemaining(timeLimit * 60);
    setIsExpired(false);
    localStorage.removeItem(`timer_${examId}`);
  };

  return (
    <div className="exam-timer" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      backgroundColor: isExpired ? '#fee2e2' : '#f3f4f6',
      border: `2px solid ${isExpired ? '#ef4444' : getTimerColor()}`
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: isExpired ? '#ef4444' : getTimerColor(),
        fontFamily: 'monospace'
      }}>
        {isExpired ? '⏰ TEMPO SCADUTO' : `⏱️ ${formatTime(timeRemaining)}`}
      </div>
      <button
        onClick={resetTimer}
        style={{
          padding: '0.25rem 0.75rem',
          fontSize: '0.875rem',
          backgroundColor: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer'
        }}
      >
        Reset Timer
      </button>
    </div>
  );
}
