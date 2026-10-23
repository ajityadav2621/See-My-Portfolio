"use client";

import React, { useEffect, useId, useRef, useState } from "react";

const FACE_PATH =
  "M10 11C14 8.5 18 7.5 21 7.2L22 9c1.3-.1 2.7-.1 4 0l1-1.8c3 .3 7 1.3 11 3.8 4 6 6.5 13 6.5 22-3.5 3.5-8.5 5.5-12.5 6l-2-3c-2 .4-3.5.5-6 .5s-4-.1-6-.5l-2 3c-4-.5-9-2.5-12.5-6 0-9 2.5-16 6.5-22z";

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

interface BitProps {
  open?: boolean;
  onOpen?: () => void;
  svgSize?: number;
  className?: string;
  compact?: boolean;
  alwaysAwake?: boolean;
}

export const Bit: React.FC<BitProps> = ({
  open = false,
  onOpen,
  svgSize = 48,
  className = "",
  compact = false,
  alwaysAwake: awakeDefault = false,
}) => {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLButtonElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const eyesRef = useRef<SVGGElement | null>(null);
  const gradientId = useId().replace(/[^a-zA-Z0-9]/g, "");

  const [awake, setAwake] = useState(awakeDefault);
  const [wiggle, setWiggle] = useState(false);
  const [blinked, setBlinked] = useState(false);
  const [widened, setWidened] = useState(false);

  const sleepTimer = useRef<number | null>(null);
  const blinkTimer = useRef<number | null>(null);
  const blinkClear = useRef<number | null>(null);
  const wideTimer = useRef<number | null>(null);
  const wiggleTimer = useRef<number | null>(null);
  const lastMouse = useRef<{ x: number; y: number; t: number } | null>(null);

  const target = useRef({ rotX: 0, rotY: 0, bx: 0, ex: 0, ey: 0 });
  const cur = useRef({ rotX: 0, rotY: 0, bx: 0, ex: 0, ey: 0 });
  const openRef = useRef(open);
  openRef.current = open;
  const alwaysAwakeRef = useRef(awakeDefault);
  alwaysAwakeRef.current = awakeDefault;

  const isAwake = awakeDefault || awake;

  const wake = () => {
    if (alwaysAwakeRef.current) {
      if (!awake) setAwake(true);
      return;
    }
    if (sleepTimer.current) {
      window.clearTimeout(sleepTimer.current);
      sleepTimer.current = null;
    }
    setAwake(true);
  };

  const startSleep = () => {
    if (alwaysAwakeRef.current) return;
    if (sleepTimer.current) window.clearTimeout(sleepTimer.current);
    sleepTimer.current = window.setTimeout(() => setAwake(false), 180);
  };

  const resetTargets = () => {
    target.current = { rotX: 0, rotY: 0, bx: 0, ex: 0, ey: 0 };
  };

  useEffect(() => {
    if (alwaysAwakeRef.current) return;
    if (open) {
      wake();
    } else {
      const hovered = rootRef.current?.matches(":hover, :focus-within") ?? false;
      if (!hovered) {
        resetTargets();
        startSleep();
      }
    }
  }, [open]);

  useEffect(() => {
    if (reduced) return;
    const scheduleBlink = () => {
      blinkTimer.current = window.setTimeout(() => {
        setBlinked(true);
        blinkClear.current = window.setTimeout(() => setBlinked(false), 140);
        scheduleBlink();
      }, 2000 + Math.random() * 3000);
    };
    scheduleBlink();
    return () => {
      if (blinkTimer.current) window.clearTimeout(blinkTimer.current);
      if (blinkClear.current) window.clearTimeout(blinkClear.current);
      if (wideTimer.current) window.clearTimeout(wideTimer.current);
      if (wiggleTimer.current) window.clearTimeout(wiggleTimer.current);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const bodyK = 0.14;
    const eyeK = 0.22;
    const tick = () => {
      const c = cur.current;
      const t = target.current;
      c.rotY += (t.rotY - c.rotY) * bodyK;
      c.rotX += (t.rotX - c.rotX) * bodyK;
      c.bx += (t.bx - c.bx) * bodyK;
      c.ex += (t.ex - c.ex) * eyeK;
      c.ey += (t.ey - c.ey) * eyeK;
      if (bodyRef.current) {
        bodyRef.current.style.transform = `translateX(${c.bx.toFixed(2)}px) rotateY(${c.rotY.toFixed(2)}deg) rotateX(${c.rotX.toFixed(2)}deg)`;
      }
      if (eyesRef.current) {
        eyesRef.current.style.transform = `translate(${c.ex.toFixed(2)}px, ${c.ey.toFixed(2)}px)`;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [reduced]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    const now = performance.now();
    if (lastMouse.current) {
      const dt = Math.max(now - lastMouse.current.t, 1);
      const dist = Math.hypot(e.clientX - lastMouse.current.x, e.clientY - lastMouse.current.y);
      if ((dist / dt) * 1000 > 2500) {
        setWidened(true);
        if (wideTimer.current) window.clearTimeout(wideTimer.current);
        wideTimer.current = window.setTimeout(() => setWidened(false), 450);
      }
    }
    lastMouse.current = { x: e.clientX, y: e.clientY, t: now };
    if (reduced) return;
    const px = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const py = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    const nx = (px - 0.5) * 2;
    const ny = (py - 0.5) * 2;
    target.current.rotY = nx * 24;
    target.current.rotX = -ny * 18;
    target.current.bx = nx * 3;
    target.current.ex = nx * 3.2;
    target.current.ey = ny * 2.2;
  };

  const handleClick = () => {
    onOpen?.();
    if (reduced) return;
    setWiggle(true);
    if (wiggleTimer.current) window.clearTimeout(wiggleTimer.current);
    wiggleTimer.current = window.setTimeout(() => setWiggle(false), 520);
  };

  const eyeScaleY = !isAwake ? 0.08 : blinked ? 0.1 : widened ? 1.2 : 1;
  const eyeScaleX = isAwake && widened ? 1.25 : 1;

  return (
    <button
      ref={rootRef}
      role="button"
      aria-label="Open chat with Bit"
      aria-expanded={open}
      onMouseEnter={wake}
      onMouseLeave={() => {
        resetTargets();
        startSleep();
      }}
      onFocus={wake}
      onBlur={() => {
        resetTargets();
        startSleep();
      }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className={`bit-root inline-flex items-center justify-center ${compact ? "px-1 py-0.5" : "px-2 py-1"} rounded-xl ${className}`}
    >
      <div ref={bodyRef} className="bit-body">
        <svg
          viewBox="0 0 48 48"
          width={svgSize}
          height={svgSize}
          className={`bit-face ${isAwake ? "bit-face-awake" : ""} ${wiggle ? "bit-wiggle" : ""}`}
          aria-hidden
        >
          <defs>
            <linearGradient id={`bit-${gradientId}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#34e0cc" />
              <stop offset="1" stopColor="#0f7f78" />
            </linearGradient>
          </defs>
          <path d={FACE_PATH} fill={`url(#bit-${gradientId})`} />
          <g ref={eyesRef}>
            <ellipse
              className="bit-eye"
              cx="17.5"
              cy="24"
              rx="3.6"
              ry="4.8"
              fill="#06201f"
              style={{ transform: `scaleY(${eyeScaleY}) scaleX(${eyeScaleX})` }}
            />
            <ellipse
              className="bit-eye"
              cx="30.5"
              cy="24"
              rx="3.6"
              ry="4.8"
              fill="#06201f"
              style={{ transform: `scaleY(${eyeScaleY}) scaleX(${eyeScaleX})` }}
            />
          </g>
        </svg>
      </div>
      {!compact && !awakeDefault && (
        <span className={`bit-zz ${awake ? "bit-zz-hidden" : ""}`} aria-hidden>
          <span className="bit-z bit-z1">z</span>
          <span className="bit-z bit-z2">Z</span>
        </span>
      )}
    </button>
  );
};

export const BitFace: React.FC<{ className?: string }> = ({ className = "" }) => {
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const eyesRef = useRef<SVGGElement | null>(null);
  const gradientId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const reduced = useReducedMotion();
  const target = useRef({ ex: 0, ey: 0 });
  const cur = useRef({ ex: 0, ey: 0 });

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const k = 0.22;
    const tick = () => {
      cur.current.ex += (target.current.ex - cur.current.ex) * k;
      cur.current.ey += (target.current.ey - cur.current.ey) * k;
      if (eyesRef.current) {
        eyesRef.current.style.transform = `translate(${cur.current.ex.toFixed(2)}px, ${cur.current.ey.toFixed(2)}px)`;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <span
      ref={wrapRef}
      aria-hidden
      className={`inline-flex items-center justify-center ${className}`}
      onMouseMove={(e) => {
        const rect = wrapRef.current?.getBoundingClientRect();
        if (!rect || reduced) return;
        const nx = clamp(((e.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
        const ny = clamp(((e.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
        target.current = { ex: nx * 3.2, ey: ny * 2.2 };
      }}
      onMouseLeave={() => {
        target.current = { ex: 0, ey: 0 };
      }}
    >
      <svg viewBox="0 0 48 48" width="100%" height="100%" className="bit-face bit-face-awake">
        <defs>
          <linearGradient id={`bitf-${gradientId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#34e0cc" />
            <stop offset="1" stopColor="#0f7f78" />
          </linearGradient>
        </defs>
        <path d={FACE_PATH} fill={`url(#bitf-${gradientId})`} />
        <g ref={eyesRef}>
          <ellipse className="bit-eye" cx="17.5" cy="24" rx="3.6" ry="4.8" fill="#06201f" />
          <ellipse className="bit-eye" cx="30.5" cy="24" rx="3.6" ry="4.8" fill="#06201f" />
        </g>
      </svg>
    </span>
  );
};
