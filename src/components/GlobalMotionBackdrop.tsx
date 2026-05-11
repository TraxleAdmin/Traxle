const streaks = Array.from({ length: 12 }, (_, index) => index);

export default function GlobalMotionBackdrop() {
  return (
    <div className="global-motion-backdrop" aria-hidden>
      {streaks.map((streak) => (
        <span key={streak} />
      ))}
    </div>
  );
}
