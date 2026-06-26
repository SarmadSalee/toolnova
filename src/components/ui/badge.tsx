import { cn } from "@/lib/utils"

const badgeVariants = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  outline: "border border-border text-foreground",
}

const badgeSizes = {
  sm: "px-1.5 py-0.5 text-[10px] gap-1",
  md: "px-2.5 py-0.5 text-xs gap-1",
  lg: "px-3 py-1 text-sm gap-1.5",
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants
  size?: keyof typeof badgeSizes
  dot?: boolean
}

export default function Badge({
  className,
  variant = "default",
  size = "md",
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "size-1.5 rounded-full",
            variant === "default" && "bg-muted-foreground",
            variant === "primary" && "bg-primary",
            variant === "secondary" && "bg-secondary",
            variant === "accent" && "bg-accent",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning",
            variant === "error" && "bg-error",
            variant === "outline" && "bg-foreground",
          )}
        />
      )}
      {children}
    </span>
  )
}
