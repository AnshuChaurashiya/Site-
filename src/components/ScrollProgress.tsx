import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const maxScroll =
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        ) - window.innerHeight;

      const currentScroll = window.scrollY;

      const percentage =
        maxScroll > 0
          ? Math.min((currentScroll / maxScroll) * 100, 100)
          : 0;

      setProgress(percentage);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', updateProgress);

    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
        <div
          className="h-[2px] bg-[#c9a96e] origin-left"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Circular Progress */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[55] hidden lg:flex flex-col items-center gap-3 pointer-events-none">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          className="-rotate-90"
        >
          {/* Background Ring */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="rgba(201,169,110,0.15)"
            strokeWidth="2"
          />

          {/* Progress Ring */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="#c9a96e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        <span className="text-[10px] font-sans tracking-[0.2em] text-[#c9a96e] tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>
    </>
  );
}