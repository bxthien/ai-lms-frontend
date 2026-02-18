import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            block w-full rounded-lg border bg-white px-3 py-2 text-zinc-900
            placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
            dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-600
            disabled:opacity-50
            ${error ? "border-red-500 focus:ring-red-500" : "border-zinc-300 dark:border-zinc-600"}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        {hint && !error && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
