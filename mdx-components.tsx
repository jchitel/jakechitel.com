import { clsx } from "clsx";
import type { MDXComponents } from "mdx/types";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        ...components,
        a: ({ className, target = "_blank", children, ...props }) => (
            <a
                target={target}
                className={clsx(className, "underline")}
                {...props}
            >
                {children}
            </a>
        ),
        p: ({ children }) => <p className="pb-4">{children}</p>,
    };
}
