"use client";

import gsap from "gsap";
import { type ReactNode, useRef } from "react";
import { LogoLoop, type LogoLoopItem } from "@/components/LogoLoop";

export type SkillsMenuItemData = {
  link: string;
  text: string;
  logos: LogoLoopItem[];
};

type SkillsMenuProps = {
  items?: SkillsMenuItemData[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
};

type SkillsMenuItemProps = SkillsMenuItemData & {
  speed?: number;
  textColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
};

const timelineDefaults = { duration: 0.6, ease: "expo" };

function getEntrySide(
  x: number,
  y: number,
  width: number,
  height: number,
): "top" | "bottom" {
  const topDistance = distanceToPoint(x, y, width / 2, 0);
  const bottomDistance = distanceToPoint(x, y, width / 2, height);
  return topDistance < bottomDistance ? "top" : "bottom";
}

function distanceToPoint(x: number, y: number, pointX: number, pointY: number) {
  const deltaX = x - pointX;
  const deltaY = y - pointY;
  return deltaX * deltaX + deltaY * deltaY;
}

function SkillsMenuItem({
  text,
  logos,
  speed = 100,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
}: SkillsMenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !marqueeRef.current || !innerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const side = getEntrySide(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: timelineDefaults })
      .set(marqueeRef.current, { y: side === "top" ? "-101%" : "101%" }, 0)
      .set(innerRef.current, { y: side === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, innerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !marqueeRef.current || !innerRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const side = getEntrySide(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: timelineDefaults })
      .to(marqueeRef.current, { y: side === "top" ? "-101%" : "101%" }, 0)
      .to(innerRef.current, { y: side === "top" ? "101%" : "-101%" }, 0);
  };

  return (
    <div
      className="menu__item"
      ref={itemRef}
      style={{ borderColor }}
    >
      <div
        className="menu__item-link font-helvetica tracking-[-0.02em] md:text-[5vh] text-[4vh] cursor-default"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {text}
      </div>
      <div
        className="marquee"
        ref={marqueeRef}
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div className="marquee__inner-wrap flex items-center h-full">
          <div
            className="marquee__inner w-full flex items-center h-full"
            ref={innerRef}
          >
            {logos.length > 0 && (
              <LogoLoop
                logos={logos}
                speed={speed}
                direction="left"
                logoHeight={40}
                gap={60}
                hoverSpeed={30}
                scaleOnHover
                fadeOut={false}
                renderItem={(logo, index) => {
                  const item = logo as LogoLoopItem & { node?: ReactNode; title?: string };
                  return (
                    <div
                      className="flex items-center gap-3 font-helvetica tracking-[0.05em] py-2"
                      style={{ color: marqueeTextColor }}
                    >
                      <span className="text-3xl md:text-5xl flex items-center justify-center">
                        {"node" in item ? item.node : null}
                      </span>
                      <span className="font-bold text-xl md:text-3xl uppercase whitespace-nowrap">
                        {"title" in item ? item.title : ""}
                      </span>
                    </div>
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsMenu({
  items = [],
  speed = 100,
  textColor = "#fff",
  bgColor = "transparent",
  marqueeBgColor = "#fff",
  marqueeTextColor = "#120F17",
  borderColor = "rgba(255,255,255,0.1)",
}: SkillsMenuProps) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, index) => (
          <SkillsMenuItem
            key={`${item.text}-${index}`}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  );
}