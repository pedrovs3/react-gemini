import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    prefix?: string
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}>
        {props.prefix && (
          <span className="flex pr-1 text-muted-foreground text-sm">{props.prefix}</span>
        )}
      <textarea
        className="w-full h-full bg-transparent focus-visible:outline-none focus-visible:ring-0 "
        onFocus={(e) => e.target.parentNode.classList.add('focus-input')}
        onBlur={(e) => e.target.parentNode.classList.remove('focus-input')}
        ref={ref}
        {...props}
      />
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

interface InputWithLabelProps extends TextareaProps {
  label: string
}

const TextareaWithLabel = ({label, ...props}: InputWithLabelProps) => {
  return (
    <div className="grid w-full items-center gap-1.5 font-code">
      <Label htmlFor={props.id}>{label}</Label>
        <Textarea id={props.id} placeholder={props.placeholder} {...props}/>
    </div>
  )
}


export { Textarea, TextareaWithLabel }
