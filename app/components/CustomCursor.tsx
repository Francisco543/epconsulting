"use client";

import { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setReady(!isTouch);
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest("a, button, [role='button'], [data-cursor-hover]")) {
        setHover(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement;
      if (!related?.closest?.("a, button, [role='button'], [data-cursor-hover]")) {
        setHover(false);
      }
    };

    const animate = () => {
      const ease = 0.18;
      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) * ease;
      setPos({ ...currentRef.current });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.documentElement.classList.remove("custom-cursor-active");
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  if (!ready) return null;

  return (
    <>
      <div
        className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-9999 will-change-transform"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          opacity: visible ? 1 : 0,
          width: hover ? 40 : 10,
          height: hover ? 40 : 10,
          marginLeft: hover ? -20 : -5,
          marginTop: hover ? -20 : -5,
          borderRadius: "50%",
          background: hover ? "rgba(212, 175, 55, 0.5)" : "#1a2e24",
          transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease, background 0.2s ease",
        }}
      />
      <div
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-9998 will-change-transform"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          opacity: visible ? 1 : 0,
          width: hover ? 56 : 32,
          height: hover ? 56 : 32,
          marginLeft: hover ? -28 : -16,
          marginTop: hover ? -28 : -16,
          borderRadius: "50%",
          border: `1.5px solid ${hover ? "#D4AF37" : "rgba(245, 230, 200, 0.5)"}`,
          transition: "width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.2s ease",
        }}
      />
    </>
  );
}
