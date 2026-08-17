import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view" | "open">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        const type = target.getAttribute("data-cursor");
        if (type === "view") {
          setCursorState("view");
          setCursorText("VIEW");
        } else if (type === "open") {
          setCursorState("open");
          setCursorText("OPEN");
        } else {
          setCursorState("hover");
          setCursorText("");
        }
      } else {
        const isClickable = (e.target as HTMLElement).closest("button, a, input, select, textarea, [role='button']");
        if (isClickable) {
          setCursorState("hover");
          setCursorText("");
        } else {
          setCursorState("default");
          setCursorText("");
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring hidden md:flex cursor-${cursorState}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <span className="cursor-text">{cursorText}</span>
      </div>
    </>
  );
};
