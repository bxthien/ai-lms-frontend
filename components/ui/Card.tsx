import * as React from "react";

export function Card({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`border-b border-zinc-200 px-6 py-4 dark:border-zinc-700 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`text-lg font-semibold text-zinc-900 dark:text-zinc-100 ${className}`} {...props} />;
}

export function CardContent({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-6 py-4 ${className}`} {...props} />;
}

export function CardFooter({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`border-t border-zinc-200 px-6 py-4 dark:border-zinc-700 ${className}`}
      {...props}
    />
  );
}
