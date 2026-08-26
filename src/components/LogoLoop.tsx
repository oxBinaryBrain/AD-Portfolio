"use client";

import {
  type CSSProperties,
  type ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

type LogoNodeItem = {
  node: ReactNode;
  title?: string;
  ariaLabel?: string;
  href?: string;
};

type LogoImageItem = {
  src: string;
  alt?: string;
  title?: string;
  href?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export type LogoLoopItem = LogoNodeItem | LogoImageItem;

type LogoLoopProps = {
  logos: LogoLoopItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoLoopItem, index: number) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

function toCssSize(value?: number | string) {
  return typeof value === "number" ? `${value}px` : (value ?? undefined);
}

function useResizeObserver(
  callback: () => void,
  refs: Array<React.RefObject<HTMLElement | null>>,
) {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const onResize = () => callback();
      window.addEventListener("resize", onResize);
      callback();
      return () => window.removeEventListener("resize", onResize);
    }

    const observers = refs.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [callback, refs]);
}

function useImageLoad(callback: () => void, listRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const images = listRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      callback();
      return;
    }

    let remaining = images.length;
    const onComplete = () => {
      remaining -= 1;
      if (remaining === 0) callback();
    };

    images.forEach((image) => {
      const img = image as HTMLImageElement;
      if (img.complete) {
        onComplete();
      } else {
        img.addEventListener("load", onComplete, { once: true });
        img.addEventListener("error", onComplete, { once: true });
      }
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", onComplete);
        image.removeEventListener("error", onComplete);
      });
    };
  }, [callback, listRef]);
}

function useMarqueeAnimation(
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetSpeed: number,
  sequenceWidth: number,
  sequenceHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
) {
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const currentSpeedRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const sequenceSize = isVertical ? sequenceHeight : sequenceWidth;
    if (sequenceSize > 0) {
      offsetRef.current = (offsetRef.current % sequenceSize + sequenceSize) % sequenceSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;

      const delta = Math.max(0, time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const desiredSpeed =
        isHovered && hoverSpeed !== undefined ? hoverSpeed : targetSpeed;
      const blend = 1 - Math.exp(-delta / SMOOTH_TAU);
      currentSpeedRef.current += (desiredSpeed - currentSpeedRef.current) * blend;

      if (sequenceSize > 0) {
        let nextOffset = offsetRef.current + currentSpeedRef.current * delta;
        nextOffset = (nextOffset % sequenceSize + sequenceSize) % sequenceSize;
        offsetRef.current = nextOffset;

        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [
    trackRef,
    targetSpeed,
    sequenceWidth,
    sequenceHeight,
    isHovered,
    hoverSpeed,
    isVertical,
  ]);
}

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Partner logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [sequenceHeight, setSequenceHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const resolvedHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === false) return undefined;
    if (pauseOnHover === true) return 0;
    return undefined;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === "up" || direction === "down";

  const targetSpeed = useMemo(() => {
    const magnitude = Math.abs(speed);
    let axisDirection: number;

    if (isVertical) {
      axisDirection = direction === "up" ? 1 : -1;
    } else {
      axisDirection = direction === "left" ? 1 : -1;
    }

    const sign = speed < 0 ? -1 : 1;
    return magnitude * axisDirection * sign;
  }, [speed, direction, isVertical]);

  const measure = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const listRect = listRef.current?.getBoundingClientRect();
    const listWidth = listRect?.width ?? 0;
    const listHeight = listRect?.height ?? 0;

    if (isVertical) {
      const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentHeight > 0) {
        const nextHeight = Math.ceil(parentHeight);
        if (containerRef.current.style.height !== `${nextHeight}px`) {
          containerRef.current.style.height = `${nextHeight}px`;
        }
      }

      if (listHeight > 0) {
        setSequenceHeight(Math.ceil(listHeight));
        const viewportHeight =
          containerRef.current?.clientHeight ?? parentHeight ?? listHeight;
        const copies =
          Math.ceil(viewportHeight / listHeight) + COPY_HEADROOM;
        setCopyCount(Math.max(MIN_COPIES, copies));
      }
    } else if (listWidth > 0) {
      setSequenceWidth(Math.ceil(listWidth));
      const copies = Math.ceil(containerWidth / listWidth) + COPY_HEADROOM;
      setCopyCount(Math.max(MIN_COPIES, copies));
    }
  }, [isVertical]);

  useResizeObserver(measure, [containerRef, listRef]);
  useImageLoad(measure, listRef);

  useMarqueeAnimation(
    trackRef,
    targetSpeed,
    sequenceWidth,
    sequenceHeight,
    isHovered,
    resolvedHoverSpeed,
    isVertical,
  );

  const cssVars = useMemo(
    () =>
      ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
      }) as CSSProperties,
    [gap, logoHeight, fadeOutColor],
  );

  const rootClassName = useMemo(
    () =>
      [
        "logoloop",
        isVertical ? "logoloop--vertical" : "logoloop--horizontal",
        fadeOut && "logoloop--fade",
        scaleOnHover && "logoloop--scale-hover",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [isVertical, fadeOut, scaleOnHover, className],
  );

  const handleMouseEnter = useCallback(() => {
    if (resolvedHoverSpeed !== undefined) setIsHovered(true);
  }, [resolvedHoverSpeed]);

  const handleMouseLeave = useCallback(() => {
    if (resolvedHoverSpeed !== undefined) setIsHovered(false);
  }, [resolvedHoverSpeed]);

  const renderLogo = useCallback(
    (item: LogoLoopItem, index: number) => {
      if (renderItem) {
        return (
          <li key={index} className="logoloop__item" role="listitem">
            {renderItem(item, index)}
          </li>
        );
      }

      const isNodeItem = "node" in item;
      const content = isNodeItem ? (
        <span
          className="logoloop__node"
          aria-hidden={!!item.href && !item.ariaLabel}
        >
          {item.node}
        </span>
      ) : (
        <img
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ""}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );

      const label = isNodeItem
        ? (item.ariaLabel ?? item.title)
        : (item.alt ?? item.title);

      const wrappedContent = item.href ? (
        <a
          className="logoloop__link"
          href={item.href}
          aria-label={label || "logo link"}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : (
        content
      );

      return (
        <li key={index} className="logoloop__item" role="listitem">
          {wrappedContent}
        </li>
      );
    },
    [renderItem],
  );

  const copies = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          key={`copy-${copyIndex}`}
          className="logoloop__list"
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? listRef : undefined}
        >
          {logos.map((logo, logoIndex) => renderLogo(logo, logoIndex))}
        </ul>
      )),
    [copyCount, logos, renderLogo],
  );

  const rootStyle = useMemo(
    () => ({
      width: isVertical
        ? toCssSize(width) === "100%"
          ? undefined
          : toCssSize(width)
        : (toCssSize(width) ?? "100%"),
      ...cssVars,
      ...style,
    }),
    [width, cssVars, style, isVertical],
  );

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      style={rootStyle}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {copies}
      </div>
    </div>
  );
});

LogoLoop.displayName = "LogoLoop";