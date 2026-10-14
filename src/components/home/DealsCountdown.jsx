import { useEffect, useState } from "react";

function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

function formatParts(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return { hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
}

export default function DealsCountdown() {
  const [remaining, setRemaining] = useState(() => getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { hours, minutes, seconds } = formatParts(remaining);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Ends in
      </span>

      <div className="flex items-center gap-1">
        <TimeBox value={hours} unit="H" />
        <span className="text-muted-foreground">:</span>
        <TimeBox value={minutes} unit="M" />
        <span className="text-muted-foreground">:</span>
        <TimeBox value={seconds} unit="S" />
      </div>
    </div>
  );
}

function TimeBox({ value, unit }) {
  return (
    <div className="flex items-baseline gap-0.5 rounded-md border border-deal/20 bg-deal/10 px-2.5 py-1 text-deal">
      <span className="text-sm font-bold tabular-nums leading-none">
        {value}
      </span>
      <span className="text-[10px] font-medium opacity-70">{unit}</span>
    </div>
  );
}
