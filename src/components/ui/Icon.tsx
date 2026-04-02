import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";

type HugeiconsProps = ComponentProps<typeof HugeiconsIcon>;

export function Icon({
  icon,
  size = 24,
  className,
  strokeWidth,
  color = "currentColor",
}: {
  icon: HugeiconsProps["icon"];
  size?: number;
  className?: string;
  strokeWidth?: number;
  color?: string;
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}
