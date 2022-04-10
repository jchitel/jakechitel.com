import React from "react";

export function deepChildrenToArray(children: React.ReactNode) {
    const array: (React.ReactChild | React.ReactPortal)[] = [];
    for (const child of React.Children.toArray(children)) {
        if (typeof child === "number" || typeof child === "string") {
            array.push(child);
        } else if (child) {
            Symbol.keyFor;
        }
    }
}
