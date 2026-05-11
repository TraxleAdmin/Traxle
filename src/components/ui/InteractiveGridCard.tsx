"use client";

import type { HTMLAttributes, MouseEventHandler } from "react";
import { useRef } from "react";

type InteractiveGridCardProps = HTMLAttributes<HTMLDivElement> & {
  intensity?: number;
};

export default function InteractiveGridCard({
  className = "",
  intensity = 18,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: InteractiveGridCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * (intensity * 0.7);
    const rotateX = ((midY - y) / midY) * (intensity * 0.7);

    element.style.setProperty("--grid-mx", `${x}px`);
    element.style.setProperty("--grid-my", `${y}px`);
    element.style.setProperty("--grid-rx", `${rotateX.toFixed(2)}deg`);
    element.style.setProperty("--grid-ry", `${rotateY.toFixed(2)}deg`);

    onMouseMove?.(event);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => {
    const element = ref.current;
    if (element) {
      element.style.setProperty("--grid-rx", "0deg");
      element.style.setProperty("--grid-ry", "0deg");
      element.style.setProperty("--grid-mx", "50%");
      element.style.setProperty("--grid-my", "50%");
    }

    onMouseLeave?.(event);
  };

  return (
    <div
      ref={ref}
      className={`interactive-grid-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <span className="interactive-grid-card__mesh" aria-hidden />
      <span className="interactive-grid-card__pointer" aria-hidden />
      <span className="interactive-grid-card__sheen" aria-hidden />
      {children}
    </div>
  );
}
