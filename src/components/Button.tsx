import Link from "next/link";
import clsx from "clsx";

const variantStyles = {
    primary:
        "bg-indigo-800 font-semibold text-zinc-100 hover:bg-indigo-700 active:bg-indigo-800 active:text-zinc-100/70 dark:bg-indigo-600 dark:hover:bg-indigo-600 dark:active:bg-indigo-700 dark:active:text-zinc-100/70",
    secondary:
        "bg-indigo-50 font-medium text-zinc-900 hover:bg-indigo-100 active:bg-indigo-100 active:text-zinc-900/60 dark:bg-indigo-700/50 dark:text-zinc-200 dark:hover:bg-indigo-800 dark:hover:text-zinc-50 dark:active:bg-indigo-800/50 dark:active:text-zinc-50/70",
};

type ButtonProps = {
    variant?: keyof typeof variantStyles;
} & (
    | (React.ComponentPropsWithoutRef<"button"> & { href?: undefined })
    | React.ComponentPropsWithoutRef<typeof Link>
);

export function Button({
    variant = "primary",
    className,
    ...props
}: ButtonProps) {
    className = clsx(
        "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
        variantStyles[variant],
        className,
    );

    return typeof props.href === "undefined" ? (
        <button className={className} {...props} />
    ) : (
        <Link className={className} {...props} />
    );
}
