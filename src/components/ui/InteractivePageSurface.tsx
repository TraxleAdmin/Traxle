"use client";

import type { HTMLAttributes, MouseEventHandler } from "react";
import { useRef } from "react";

type InteractivePageSurfaceProps = HTMLAttributes<HTMLDivElement> & {
  intensity?: number;
};

export default function InteractivePageSurface({
  className = "",
  intensity = 8,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: InteractivePageSurfaceProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const pointerFrame = useRef<number | null>(null);
  const pointerPosition = useRef({ x: 0, y: 0 });

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    pointerPosition.current = { x: event.clientX, y: event.clientY };

    if (pointerFrame.current === null) {
      pointerFrame.current = window.requestAnimationFrame(() => {
        pointerFrame.current = null;
        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const x = pointerPosition.current.x - rect.left;
        const y = pointerPosition.current.y - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;

        const rotateY = ((x - midX) / midX) * (intensity * 0.58);
        const rotateX = ((midY - y) / midY) * (intensity * 0.58);

        element.style.setProperty("--page-mx", `${x}px`);
        element.style.setProperty("--page-my", `${y}px`);
        element.style.setProperty("--page-rx", `${rotateX.toFixed(2)}deg`);
        element.style.setProperty("--page-ry", `${rotateY.toFixed(2)}deg`);
      });
    }

    onMouseMove?.(event);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => {
    if (pointerFrame.current !== null) {
      window.cancelAnimationFrame(pointerFrame.current);
      pointerFrame.current = null;
    }

    const element = ref.current;
    if (element) {
      element.style.setProperty("--page-rx", "0deg");
      element.style.setProperty("--page-ry", "0deg");
      element.style.setProperty("--page-mx", "50%");
      element.style.setProperty("--page-my", "50%");
    }

    onMouseLeave?.(event);
  };

  return (
    <section
      ref={ref}
      className={`interactive-page-surface ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <span className="interactive-page-surface__mesh" aria-hidden />
      <span className="interactive-page-surface__glow" aria-hidden />
      <span className="interactive-page-surface__sheen" aria-hidden />
      <div className="interactive-page-surface__content">{children}</div>
    </section>
  );
}
