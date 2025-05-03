'use client';

import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div data-testid="progress-bar" className="fixed top-0 left-0 w-full h-1 z-50">
      <div 
        data-testid="progress-bar-fill"
        className="h-full bg-blue-500 transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 