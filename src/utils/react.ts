import React from "react";

/**
 * Works like `React.Children.toArray()` but also flattens fragment elements.
 *
 * This guarantees an array of only the following:
 * - non-fragment elements (including portals)
 * - text (string or number)
 */
export const flattenFragments = (
    children: React.ReactNode
): (React.ReactChild | React.ReactPortal)[] => {
    return React.Children.toArray(children).flatMap((child) => {
        if (isFragment(child)) {
            return flattenFragments(child.props.children);
        } else {
            // React.ReactFragment and ComponentElement<typeof React.Fragment> aren't the same type but they should be
            return [child as React.ReactChild | React.ReactPortal];
        }
    });
};

export type ComponentElement<
    P,
    T extends React.ComponentType<P>
> = React.ReactElement<P, T>;

/** Returns true if the node is an element of type `React.Fragment` */
export const isFragment = (
    node: React.ReactNode
): node is React.ReactElement<
    { children: React.ReactNode },
    typeof React.Fragment
> => isElementOfType(node, React.Fragment);

export const isElementOfType = <P, T extends React.FunctionComponent<P>>(
    node: React.ReactNode,
    type: T
): node is React.ReactElement<P, T> => {
    return React.isValidElement(node) && node.type === type;
};
