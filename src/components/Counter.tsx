"use client";

import { useInView, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

type CounterProps = {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
};

function getDecimalPlaces(value: number) {
  const stringValue = value.toString();
  if (!stringValue.includes(".")) return 0;

  const fraction = stringValue.split(".")[1];
  if (parseInt(fraction, 10) !== 0) return fraction.length;
  return 0;
}

export function Counter({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const decimalPlaces = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (value: number) => {
      const hasDecimals = decimalPlaces > 0;
      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? decimalPlaces : 0,
        maximumFractionDigits: hasDecimals ? decimalPlaces : 0,
      };
      const formatted = Intl.NumberFormat("en-US", options).format(value);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [decimalPlaces, separator],
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === "down" ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (!isInView || !startWhen) return;

    onStart?.();

    const startTimeout = window.setTimeout(() => {
      motionValue.set(direction === "down" ? from : to);
    }, delay * 1000);

    const endTimeout = window.setTimeout(() => {
      onEnd?.();
    }, delay * 1000 + duration * 1000);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearTimeout(endTimeout);
    };
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    duration,
    onStart,
    onEnd,
  ]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (value) => {
      if (ref.current) {
        ref.current.textContent = formatValue(value);
      }
    });

    return unsubscribe;
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}