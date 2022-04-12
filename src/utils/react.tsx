import React from "react";
import ReactIs from "react-is";

/**
 * The type of render-significant values in React.
 *
 * `React.ReactNode` is the "raw" type of values that can be passed as children to most react components.
 * It includes:
 * - React "text" (strings and numbers, rendered as-is in the output markup)
 * - React elements (e.g. `<div />`, elements are rendered as HTML or based on the implementation of another component)
 * - React portals (react-dom's `createPortal(children, element)`, portals are rendered to another part of the DOM)
 * - booleans (`true` and `false` are never rendered, this is intended for using `&&` to conditionally render)
 * - `null`/`undefined` (`null` and `undefined` are never rendered)
 * - iterables of any of the above (these are ultimately flattened when rendered)
 *
 * This type only includes values that are actually significant to rendering:
 * text, elements, and portals.
 *
 * Use `normalizeChildren()` to turn `React.ReactNode` to an array of `NormalizedNode`.
 */
export type NormalizedNode =
    | React.ReactText
    | React.ReactElement
    | React.ReactPortal;

/**
 * Similar to `React.Children.toArray()`, but returns the proper type `NormalizedNode`
 * and flattens fragments so that only actual elements or HTML text are included in the result.
 *
 * NOTE: This function _probably_ doesn't handle keys correctly. More testing is probably required.
 */
export function normalizeChildren(children: React.ReactNode): NormalizedNode[] {
    const array: NormalizedNode[] = [];
    for (const node of childrenToArray(children)) {
        if (isFragment(node)) {
            array.push(...normalizeChildren(node.props.children));
        } else {
            array.push(node);
        }
    }
    return array;
}

/**
 * Create a type guard for a specific component type that preserves the type of props.
 *
 * Example:
 * ```tsx
 * const MyComponent = (props: { a: number }) => null;
 * const isMyComponent = isElementOfType(MyComponent);
 * const element = <MyComponent a={1} />;
 *
 * if (isMyComponent(element)) {
 *     // Thanks to isElementOfType(), this is type safe
 *     expect(element.props.a).toBe(1);
 * }
 * ```
 *
 * TODO: ideally we'd be able to be generic over the component type instead of the props,
 * but for some reason the prop types are inferred to `unknown`.
 */
export function isElementOfType<P>(component: React.ComponentType<P>) {
    return (element: React.ReactNode): element is React.ReactElement<P> => {
        if (ReactIs.isElement(element)) {
            return element.type === component;
        }
        return false;
    };
}

/**
 * The return type of `React.Children.toArray()` also includes `React.ReactFragment`,
 * which is actually just an iterable, not a `<></>`.
 * However, `React.Children.toArray()` always flattens iterables, so the more accurate type is `NormalizedNode`.
 */
function childrenToArray(children: React.ReactNode): NormalizedNode[] {
    return React.Children.toArray(children) as NormalizedNode[];
}

/**
 * The return type of `ReactIs.isFragment(value)` is `value is React.ReactElement`.
 * That's nice and everything, but `React.Fragment` has a props type of `{ children?: React.ReactNode }`.
 * This function is typed correctly so that we don't need any casting to get at `props.children`.
 */
function isFragment(
    node: React.ReactNode
): node is React.ReactElement<
    { children?: React.ReactNode },
    typeof React.Fragment
> {
    return ReactIs.isFragment(node);
}
