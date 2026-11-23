import { useEffect, useMemo, useState } from "react";

export type AnimatedCountUpProps = {
  end: number;
  start?: number;
  duration?: number;
  separator?: string;
  className?: string;
  formattingFn?: (value: number) => string;
};

const formatValue = (value: number, separator: string) => {
  const roundedValue = Math.round(value);
  const absoluteValue = Math.abs(roundedValue).toString();
  const groupedInteger = absoluteValue.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return roundedValue < 0 ? `-${groupedInteger}` : groupedInteger;
};

const AnimatedCountUp = ({
  end,
  start = 0,
  duration = 1200,
  separator = "",
  className,
  formattingFn,
}: AnimatedCountUpProps) => {
  const [currentValue, setCurrentValue] = useState(start);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || duration <= 0) {
      setCurrentValue(end);
      return undefined;
    }

    let animationFrameId = 0;
    const animationStart = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - animationStart) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = start + (end - start) * easedProgress;

      setCurrentValue(nextValue);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    setCurrentValue(start);
    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [duration, end, prefersReducedMotion, start]);

  const formattedValue = formattingFn
    ? formattingFn(Math.round(currentValue))
    : formatValue(currentValue, separator);

  return <span className={className}>{formattedValue}</span>;
};

export default AnimatedCountUp;
