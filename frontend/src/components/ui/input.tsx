import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="relative">
        {type === "password" && (
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="absolute top-[50%] right-2 transform  -translate-y-1/2 cursor-pointer"
          >
            <div className="relative">
              {/* <Icon
                icon="mdi:eye"
                color="gray"
                className="text-gray"
                fontSize="28px"
              /> */}
              <Eye color="gray" className="text-gray" fontSize="28px" />
              <div
                className={`${
                  open ? "w-0" : "w-6"
                } transition-all absolute h-[2px] rotate-45 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#808080] rounded-full`}
              ></div>
            </div>
          </div>
        )}
        <input
          type={type === "password" ? (open ? "text" : "password") : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input transition-all ease-in-out bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          onChange={(e) => {
            if (type == "number") {
              const value = parseInt(e.currentTarget.value, 10);
              if (!isNaN(value)) {
                return Number(value);
              } else {
                return "";
              }
            }
            return e.currentTarget.value;
          }}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
