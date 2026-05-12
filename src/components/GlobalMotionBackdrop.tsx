const meteors = Array.from({ length: 4 }, (_, index) => index);

export default function GlobalMotionBackdrop() {
  return (
    <div className="global-motion-backdrop" aria-hidden>
      {meteors.map((meteor) => (
        <span key={meteor} />
      ))}
    </div>
  );
}
