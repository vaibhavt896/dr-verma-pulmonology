import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex group relative items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-medical-blue text-white shadow-[0_10px_20px_-10px_rgba(2,6,23,0.5)] hover:shadow-[0_20px_40px_-15px_rgba(2,6,23,0.6)] hover:-translate-y-1 hover:bg-[#0B1527] border border-white/10",
        destructive:
          "bg-care-coral text-white hover:bg-red-700 shadow-sm hover:shadow-md",
        outline:
          "border-2 border-medical-blue/20 bg-transparent text-medical-blue hover:bg-medical-blue hover:text-white hover:border-transparent hover:shadow-[0_10px_20px_-10px_rgba(2,6,23,0.3)] hover:-translate-y-0.5",
        secondary:
          "bg-healing-green text-white shadow-[0_10px_20px_-10px_rgba(13,148,136,0.5)] hover:shadow-[0_20px_40px_-15px_rgba(13,148,136,0.6)] hover:-translate-y-1 hover:bg-[#0F766E] border border-white/10",
        ghost:
          "hover:bg-slate-100 text-slate-600 hover:text-medical-blue",
        link: "text-healing-green underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-4",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {props.children}
      </span>
      {/* 2026 Shine Effect for solid buttons */}
      {(variant === 'default' || variant === 'secondary') && (
        <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
