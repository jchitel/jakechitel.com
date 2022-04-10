import React, { createContext } from "react";
import {
    ContextConsumer,
    //     ContextProvider,
    //     Element,
    //     ForwardRef,
    //     Fragment,
    //     Lazy,
    //     Memo,
    //     Portal,
    //     Profiler,
    //     StrictMode,
    //     Suspense,
    //     isContextConsumer,
    //     isContextProvider,
    //     isElement,
    //     isForwardRef,
    //     isFragment,
    //     isLazy,
    //     isMemo,
    //     isPortal,
    //     isProfiler,
    //     isStrictMode,
    //     isSuspense,
    //     isValidElementType,
    //     typeOf,
} from "react-is";

/**
 * There are some internal aspects of React that aren't well documented.
 * These tests are meant to be an evidence-based reference that we can use as "documentation" of these aspects.
 */
describe("React Internals", () => {
    test("Context", () => {
        const context = createContext(-1);
        context.displayName = "TestContext";

        const keys = Object.keys(context);
        const propertyNames = Object.getOwnPropertyNames(context);
        const propertySymbols = Object.getOwnPropertySymbols(context);
        expect(keys).toEqual([
            "$$typeof",
            "_currentValue",
            "_currentValue2",
            "_threadCount",
            "Provider",
            "Consumer",
            "_defaultValue",
            "_globalName",
            "_currentRenderer",
            "_currentRenderer2",
            "displayName",
        ]);
        expect(propertyNames).toEqual(keys);
        expect(propertySymbols).toEqual([]);

        const transparentContext = context as TransparentContext<number>;

        expect(transparentContext.$$typeof).toEqual(ContextConsumer);
        expect(transparentContext._currentValue).toEqual(-1);
        expect(transparentContext._currentValue2).toEqual(-1);
        expect(transparentContext._threadCount).toEqual(0);
        //expect(transparentContext.Provider).toEqual({});
        //expect(transparentContext.Consumer).toEqual({});
        expect(transparentContext._defaultValue).toBeNull();
        expect(transparentContext._globalName).toBeNull();
        expect(transparentContext._currentRenderer).toBeNull();
        expect(transparentContext._currentRenderer2).toBeNull();
    });
});

interface TransparentContext<T> extends React.Context<T> {
    $$typeof: typeof ContextConsumer;
    _currentValue: T;
    _currentValue2: T;
    _threadCount: number;
    _defaultValue: T;
    _globalName: string;
    _currentRenderer: unknown;
    _currentRenderer2: unknown;
}
