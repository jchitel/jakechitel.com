import React, { createContext } from "react";
import {
    ContextConsumer,
    ContextProvider,
    //     Element,
    //     ForwardRef,
    //     Fragment,
    //     Lazy,
    //     Memo,
    //     Portal,
    //     Profiler,
    //     StrictMode,
    //     Suspense,
    isContextConsumer,
    isContextProvider,
    //     isElement,
    //     isForwardRef,
    //     isFragment,
    //     isLazy,
    //     isMemo,
    //     isPortal,
    //     isProfiler,
    //     isStrictMode,
    //     isSuspense,
    isValidElementType,
    typeOf,
} from "react-is";

/**
 * There are some internal aspects of React that aren't well documented.
 * These tests are meant to be an evidence-based reference that we can use as "documentation" of these aspects.
 */
describe("React Internals", () => {
    test("Context", () => {
        const context = createContext(-1) as React.Context<number> & {
            $$typeof: symbol;
        };

        expect(context.$$typeof).toEqual(ContextConsumer);
        expect(typeOf(context)).toBeUndefined();
        expect(isContextConsumer(context)).toEqual(false);
        expect(isContextProvider(context)).toEqual(false);
        // wtf - should be false because you can't render it
        expect(isValidElementType(context)).toEqual(true);

        expect(context.Provider.$$typeof).toEqual(ContextProvider);
        // wtf - should be `ContextProvider`
        expect(typeOf(context.Provider)).toBeUndefined();
        expect(isContextConsumer(context.Provider)).toEqual(false);
        // wtf - should be true
        expect(isContextProvider(context.Provider)).toEqual(false);
        expect(isValidElementType(context.Provider)).toEqual(true);

        expect(context.Consumer.$$typeof).toEqual(ContextConsumer);
        // wtf - should be `ContextConsumer`
        expect(typeOf(context.Consumer)).toBeUndefined();
        // wtf - should be true
        expect(isContextConsumer(context.Consumer)).toEqual(false);
        expect(isContextProvider(context.Consumer)).toEqual(false);
        expect(isValidElementType(context.Consumer)).toEqual(true);
    });
});
