import React, { createContext, forwardRef, memo } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import ReactIs, {
    isContextConsumer,
    isContextProvider,
    isElement,
    isForwardRef,
    isFragment,
    isLazy,
    isMemo,
    isPortal,
    isProfiler,
    isStrictMode,
    isSuspense,
    isValidElementType,
    typeOf,
} from "react-is";
import { isElementOfType, normalizeChildren } from "../react";

describe("React Utils", () => {
    describe("normalizeChildren", () => {
        test("handle a single node", () => {
            expect(normalizeChildren("Hello")).toEqual(["Hello"]);
            expect(normalizeChildren(12)).toEqual([12]);
            expect(normalizeChildren(<div />)).toEqual([
                expect.objectContaining({ type: "div" }),
            ]);
            expect(normalizeChildren(null)).toEqual([]);
        });

        test("flatten deep fragments", () => {
            expect(
                normalizeChildren(
                    <>
                        <div>A</div>
                        <>
                            <div>B</div>
                            <>
                                <div>C</div>
                            </>
                        </>
                    </>
                )
            ).toEqual([
                expect.objectContaining({
                    type: "div",
                    props: { children: "A" },
                }),
                expect.objectContaining({
                    type: "div",
                    props: { children: "B" },
                }),
                expect.objectContaining({
                    type: "div",
                    props: { children: "C" },
                }),
            ]);
        });
    });

    describe("isElementOfType", () => {
        test("works and is type safe", () => {
            const MyComponent: React.ComponentType<{ a: number }> = (props: {
                a: number;
            }) => <div>{props.a}</div>;
            const isMyComponent = isElementOfType(MyComponent);
            const element = <MyComponent a={1} />;

            if (isMyComponent(element)) {
                expect(element.props.a).toBe(1);
            } else {
                fail(
                    "isElementOfType() didn't work the way it was supposed to"
                );
            }

            expect(isMyComponent(<div />)).toBe(false);
            expect(isMyComponent("Hey")).toBe(false);
            expect(isMyComponent(12)).toBe(false);
            expect(isMyComponent(null)).toBe(false);
        });
    });
});

/**
 * There are some internal aspects of React that aren't well documented.
 * These tests are meant to be an evidence-based reference that we can use as "documentation" of these aspects.
 */
describe("React Internals", () => {
    /**
     * The react-is library has extremely loose types and extremely loose behavior.
     * This set of tests documents this behavior.
     */
    describe("react-is", () => {
        const context = createContext(-1);
        const { Consumer, Provider } = context;
        const ForwardRefComponent = forwardRef<HTMLDivElement>(
            (_props, ref) => <div ref={ref} />
        );
        ForwardRefComponent.displayName = "ForwardRefComponent";
        const LazyComponent = React.lazy(
            () =>
                new Promise<{ default: React.ComponentType<unknown> }>(
                    (resolve) => {
                        const Component = () => null;
                        resolve({ default: Component });
                    }
                )
        );
        const MemoComponent = memo(() => null);
        MemoComponent.displayName = "MemoComponent";

        const consumerElement = <Consumer>{() => null}</Consumer>;
        const providerElement = <Provider value={1} />;
        const divElement = <div />;
        const fragment = <></>;
        const forwardRefElement = <ForwardRefComponent />;
        const lazyElement = <LazyComponent />;
        const memoElement = <MemoComponent />;
        const portal = createPortal(null, document.body);
        const profilerElement = (
            <React.Profiler id="abc" onRender={() => null} />
        );
        const strictModeElement = <React.StrictMode />;
        const suspenseElement = <React.Suspense />;

        /**
         * `typeOf(value) === ReactIs.ContextConsumer`
         */
        test("isContextConsumer", () => {
            expect(isContextConsumer(context)).toBe(false);
            expect(isContextConsumer(Consumer)).toBe(false);
            expect(isContextConsumer(consumerElement)).toBe(true);
        });

        /**
         * `typeOf(value) === ReactIs.ContextProvider`
         */
        test("isContextProvider", () => {
            expect(isContextProvider(context)).toBe(false);
            expect(isContextProvider(Provider)).toBe(false);
            expect(isContextProvider(providerElement)).toBe(true);
        });

        /**
         * `isElement(value)` works differently from the other `isX(value)` functions
         * because it is more general. It simply checks for `$$typeof === ReactIs.Element`
         */
        test("isElement", () => {
            expect(isElement(Provider)).toBe(false);
            expect(isElement(providerElement)).toBe(true);
            expect(isElement("div")).toBe(false);
            expect(isElement(divElement)).toBe(true);
            expect(isElement(React.Fragment)).toBe(false);
            expect(isElement(fragment)).toBe(true);
        });

        /**
         * `typeOf(value) === ReactIs.ForwardRef`
         */
        test("isForwardRef", () => {
            expect(isForwardRef(ForwardRefComponent)).toBe(false);
            expect(isForwardRef(forwardRefElement)).toBe(true);
        });

        /**
         * `typeOf(value) === ReactIs.Fragment`
         */
        test("isFragment", () => {
            expect(isFragment(React.Fragment)).toBe(false);
            expect(isFragment([])).toBe(false);
            expect(isFragment(fragment)).toBe(true);
        });

        /**
         * `typeOf(value) === ReactIs.Lazy`
         */
        test("isLazy", () => {
            expect(isLazy(LazyComponent)).toBe(false);
            expect(isLazy(lazyElement)).toBe(true);
        });

        /**
         * `typeOf(value) === ReactIs.Memo`
         */
        test("isMemo", () => {
            expect(isMemo(MemoComponent)).toBe(false);
            expect(isMemo(memoElement)).toBe(true);
        });

        /**
         * `typeOf(value) === ReactIs.Portal`
         */
        test("isPortal", () => {
            expect(isPortal(portal)).toBe(true);
        });

        /**
         * `typeOf(value) === ReactIs.Profiler`
         */
        test("isProfiler", () => {
            expect(isProfiler(React.Profiler)).toBe(false);
            expect(isProfiler(profilerElement)).toBe(true);
        });

        /**
         * `typeOf(value) === ReactIs.StrictMode`
         */
        test("isStrictMode", () => {
            expect(isStrictMode(React.StrictMode)).toBe(false);
            expect(isStrictMode(strictModeElement)).toBe(true);
        });

        /**
         * `typeOf(value) === ReactIs.Suspense`
         */
        test("isSuspense", () => {
            expect(isSuspense(React.Suspense)).toBe(false);
            expect(isSuspense(suspenseElement)).toBe(true);
        });

        /**
         * `isValidElementType(value)` is a very loose function. It works on any string, function,
         * built-in React element type, or object with a `$$typeof` property.
         *
         * It "works" but it's a little misleading because even a React context object returns true
         * for this function.
         */
        test("isValidElementType", () => {
            // "Exotic" element types, we'd expect all of these to be valid
            expect(isValidElementType(Consumer)).toBe(true);
            expect(isValidElementType(Provider)).toBe(true);
            expect(isValidElementType(ForwardRefComponent)).toBe(true);
            expect(isValidElementType(React.Fragment)).toBe(true);
            expect(isValidElementType(LazyComponent)).toBe(true);
            expect(isValidElementType(MemoComponent)).toBe(true);
            expect(isValidElementType(React.Profiler)).toBe(true);
            expect(isValidElementType(React.StrictMode)).toBe(true);
            expect(isValidElementType(React.Suspense)).toBe(true);

            // Elements themselves are never valid element _types_
            expect(isValidElementType(consumerElement)).toBe(false);
            expect(isValidElementType(providerElement)).toBe(false);
            expect(isValidElementType(divElement)).toBe(false);
            expect(isValidElementType(forwardRefElement)).toBe(false);
            expect(isValidElementType(fragment)).toBe(false);
            expect(isValidElementType(lazyElement)).toBe(false);
            expect(isValidElementType(memoElement)).toBe(false);
            expect(isValidElementType(portal)).toBe(false);
            expect(isValidElementType(profilerElement)).toBe(false);
            expect(isValidElementType(strictModeElement)).toBe(false);
            expect(isValidElementType(suspenseElement)).toBe(false);

            // DOM elements and components are valid
            expect(isValidElementType("div")).toBe(true);
            expect(isValidElementType(() => null)).toBe(true);

            // Invalid element types that still return true

            // You can't use a context as an element type
            expect(isValidElementType(context)).toBe(true);
            // Non-existent DOM element, not really a huge deal but technically invalid
            expect(isValidElementType("definitelyNotAnElementType")).toBe(true);
            // Any function works! 😄
            expect(isValidElementType(eval)).toBe(true);
            // Any arbitrary object with a `$$typeof` works
            expect(isValidElementType({ $$typeof: ReactIs.Lazy })).toBe(true);
        });

        /**
         * `typeOf(value)` only works for elements and portals. `undefined` is returned for all other values.
         */
        test("typeOf", () => {
            // "Exotic" element types, we'd expect all of these to return undefined because they aren't elements
            expect(typeOf(Consumer)).toBeUndefined();
            expect(typeOf(Provider)).toBeUndefined();
            expect(typeOf(ForwardRefComponent)).toBeUndefined();
            expect(typeOf(React.Fragment)).toBeUndefined();
            expect(typeOf(LazyComponent)).toBeUndefined();
            expect(typeOf(MemoComponent)).toBeUndefined();
            expect(typeOf(React.Profiler)).toBeUndefined();
            expect(typeOf(React.StrictMode)).toBeUndefined();
            expect(typeOf(React.Suspense)).toBeUndefined();

            // Elements themselves should always return a type
            expect(typeOf(consumerElement)).toBe(ReactIs.ContextConsumer);
            expect(typeOf(providerElement)).toBe(ReactIs.ContextProvider);
            expect(typeOf(divElement)).toBe(ReactIs.Element);
            expect(typeOf(forwardRefElement)).toBe(ReactIs.ForwardRef);
            expect(typeOf(fragment)).toBe(ReactIs.Fragment);
            expect(typeOf(lazyElement)).toBe(ReactIs.Lazy);
            expect(typeOf(memoElement)).toBe(ReactIs.Memo);
            expect(typeOf(portal)).toBe(ReactIs.Portal);
            expect(typeOf(profilerElement)).toBe(ReactIs.Profiler);
            expect(typeOf(strictModeElement)).toBe(ReactIs.StrictMode);
            expect(typeOf(suspenseElement)).toBe(ReactIs.Suspense);

            // DOM elements and components are not elements
            expect(typeOf("div")).toBeUndefined();
            expect(typeOf(() => null)).toBeUndefined();

            // Other values

            // Contexts have `$$typeof` but the top level has to be either `ReactIs.Element` or `ReactIs.Portal`
            expect(typeOf(context)).toBeUndefined();
            // Any arbitrary object with a `$$typeof` won't work unless it's `Element` or `Portal`
            expect(typeOf({ $$typeof: ReactIs.Lazy })).toBeUndefined();
            expect(typeOf({ $$typeof: ReactIs.Element })).toBe(ReactIs.Element);
            expect(typeOf({ $$typeof: ReactIs.Portal })).toBe(ReactIs.Portal);
            // An "element" with a "type" that is valid will technically work
            expect(
                typeOf({
                    $$typeof: ReactIs.Element,
                    type: { $$typeof: ReactIs.ContextProvider },
                })
            ).toBe(ReactIs.ContextProvider);
        });
    });

    describe("Context", () => {
        test("general structure", () => {
            const context = createContext(-1);
            const { Provider, Consumer } = context;

            const providerElement = <Provider value={1} />;
            const consumerElement = <Consumer>{() => null}</Consumer>;

            const contextWithTypeof = context as typeof context & {
                $$typeof: symbol;
            };
            const providerElementWithTypeof =
                providerElement as typeof providerElement & {
                    $$typeof: symbol;
                };
            const consumerElementWithTypeof =
                consumerElement as typeof consumerElement & {
                    $$typeof: symbol;
                };

            // For some reason the `$$typeof` of a context is `ContextConsumer`.
            // You'd think a context and consumer would have their own types.
            expect(contextWithTypeof.$$typeof).toBe(ReactIs.ContextConsumer);

            // These make sense
            expect(Provider.$$typeof).toBe(ReactIs.ContextProvider);
            expect(Consumer.$$typeof).toBe(ReactIs.ContextConsumer);
            expect(providerElementWithTypeof.$$typeof).toBe(ReactIs.Element);
            expect(providerElement.type).toBe(Provider);
            expect(consumerElementWithTypeof.$$typeof).toBe(ReactIs.Element);
            expect(consumerElement.type).toBe(Consumer);
        });
    });

    describe("Children", () => {
        test("React does not modify props.children", async () => {
            let resolve: (children: React.ReactNode) => void;
            const promise = new Promise<React.ReactNode>((r) => {
                resolve = r;
            });

            const Component = ({ children }: { children: React.ReactNode }) => {
                resolve(children);
                return null;
            };

            const portalElement = document.createElement("div");
            document.body.appendChild(portalElement);
            const portal = createPortal(<label />, portalElement);

            // The following are all of the valid things that can be passed as `React.ReactNode`:
            // - strings
            // - numbers
            // - booleans
            // - null
            // - undefined
            // - elements (includes fragments)
            // - portals
            // - iterables of any of the above (e.g. arrays)
            const element = (
                <Component>
                    Text
                    {2}
                    {true}
                    {false}
                    {null}
                    {undefined}
                    <div key="a" />
                    <>
                        <div key="b" />
                    </>
                    {portal}
                    {[<div key="c" />, <div key="d" />]}
                </Component>
            );

            const rootElement = document.createElement("div");
            document.body.appendChild(rootElement);

            const root = createRoot(rootElement);
            root.render(element);

            const children = await promise;

            // Based on this, it appears that props.children is exactly the
            // unmodified children that get passed to the element.
            expect(children).toEqual([
                "Text",
                2,
                true,
                false,
                null,
                undefined,
                <div key="a" />,
                <>
                    <div key="b" />
                </>,
                portal,
                [<div key="c" />, <div key="d" />],
            ]);
        });

        test("React.Children.toArray() strips and flattens props.children", () => {
            const portalElement = document.createElement("div");
            document.body.appendChild(portalElement);
            const portal = createPortal(<label />, portalElement);

            const children = [
                "Text",
                2,
                true,
                false,
                null,
                undefined,
                <div key="a" />,
                <>
                    <div key="b" />
                </>,
                portal,
                [<div key="c" />, <div key="d" />],
            ];

            const arrayified = React.Children.toArray(children);

            // Based on this, `React.Children.toArray()` does the following:
            // - strip out all boolean, null, and undefined
            // - flatten arrays
            expect(arrayified).toEqual([
                "Text",
                2,
                expect.objectContaining({ type: "div" }),
                expect.objectContaining({
                    type: React.Fragment,
                    props: {
                        children: expect.objectContaining({
                            type: "div",
                        }) as React.ReactNode,
                    },
                }),
                expect.objectContaining({
                    containerInfo: portalElement,
                    children: expect.objectContaining({
                        type: "label",
                    }) as React.ReactNode,
                }),
                expect.objectContaining({ type: "div" }),
                expect.objectContaining({ type: "div" }),
            ]);
        });

        test("React.Children.toArray() flattens arbitrarily deep arrays", () => {
            const arrayified = React.Children.toArray([
                [
                    <div key="a" />,
                    [<div key="b" />, [<div key="c" />, [<div key="d" />]]],
                ],
            ]);

            // Arrays are flattened arbitrarily deep
            expect(arrayified).toEqual([
                expect.objectContaining({ type: "div" }),
                expect.objectContaining({ type: "div" }),
                expect.objectContaining({ type: "div" }),
                expect.objectContaining({ type: "div" }),
            ]);
        });
    });
});
