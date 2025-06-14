
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold shadow-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 px-5 py-2.5",
  {
    variants: {
      variant: {
        default: "bg-pink text-white hover:bg-pink-dark",
        blue: "bg-blue text-white hover:bg-blue-dark",
        outline: "border border-lightgray bg-white text-dark hover:bg-blue/10 hover:text-blue-dark",
        ghost: "bg-transparent text-dark hover:bg-lightgray",
        hers: "bg-pink text-white hover:bg-pink-dark",
        his: "bg-blue text-white hover:bg-blue-dark",
        secondary: "bg-blue text-white hover:bg-blue-dark",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 rounded-xl px-4 py-2 text-sm",
        lg: "h-14 rounded-xl px-8 py-4 text-lg",
        icon: "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
