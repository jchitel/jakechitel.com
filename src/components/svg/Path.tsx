import React, {
    createContext,
    useCallback,
    useMemo,
    useLayoutEffect,
    useRef,
    useContext,
} from "react";
import { panic } from "../../utils";

type PathProps = React.SVGProps<SVGPathElement>;

const pathContext = createContext<PathContext | null>(null);
const PathContextProvider = pathContext.Provider;

const usePathContext = (component: string) => {
    return (
        useContext(pathContext) ??
        panic(`<${component} /> can't be used outside of <Path />`)
    );
};

interface PathContext {
    addPathCommand: (command: string) => void;
}

export default function Path({ d, children, ...props }: PathProps) {
    const pathDef = useRef(d ? [d] : []);

    useLayoutEffect(() => {
        if (!d) {
            pathDef.current = [];
        }
    });

    const addPathCommand = useCallback(
        (command: string) => {
            if (!d) {
                pathDef.current = [...pathDef.current, command];
            }
        },
        [d]
    );

    const pathContext: PathContext = useMemo(
        () => ({ addPathCommand }),
        [addPathCommand]
    );

    return (
        <PathContextProvider value={pathContext}>
            <path d={d ?? pathDef.current.join(" ")} {...props}>
                {children}
            </path>
        </PathContextProvider>
    );
}

interface MoveProps {
    to: [x: number, y: number];
}

export const Move = ({ to: [x, y] }: MoveProps) => {
    const { addPathCommand } = usePathContext("Move");

    useLayoutEffect(() => {
        addPathCommand(`M ${x},${y}`);
    });

    return null;
};

interface MoveRelativeProps {
    delta: [dx: number, dy: number];
}

export function MoveRelative({ delta: [dx, dy] }: MoveRelativeProps) {
    const { addPathCommand } = usePathContext("MoveRelative");

    useLayoutEffect(() => {
        addPathCommand(`m ${dx},${dy}`);
    });

    return null;
}

interface LineProps {
    x?: number;
    y?: number;
}

export function Line({ x, y }: LineToProps) {
    const { addPathCommand } = usePathContext("LineTo");

    useLayoutEffect(() => {
        if (x && y) {
            addPathCommand(`L ${x},${y}`);
        } else if (x) {
            addPathCommand(`H ${x}`);
        } else if (y) {
            addPathCommand(`V ${y}`);
        } else {
            // if neither x nor y was specified then just issue a noop move
            addPathCommand("m 0,0");
        }
    });

    return null;
}

interface LineToRelativeProps {
    dx?: number;
    dy?: number;
}

export function LineToRelative({ dx, dy }: LineToRelativeProps) {
    const { addPathCommand } = usePathContext("LineToRelative");

    useLayoutEffect(() => {
        if (dx && dy) {
            addPathCommand(`l ${dx},${dy}`);
        } else if (dx) {
            addPathCommand(`h ${dx}`);
        } else if (dy) {
            addPathCommand(`v ${dy}`);
        } else {
            // if neither dx nor dy was specified then just issue a noop move
            addPathCommand("m 0,0");
        }
    });

    return null;
}

interface CBezierProps {
    //
}

export function CBezier(props: CBezierProps) {
    return null;
}

interface CBezierRelativeProps {
    //
}

export function CBezierRelative(props: CBezierRelativeProps) {
    return null;
}

interface QBezierProps {
    //
}

export function QBezier(props: QBezierProps) {
    return null;
}

interface QBezierRelativeProps {
    //
}

export function QBezierRelative(props: QBezierRelativeProps) {
    return null;
}

export function Arc(props: ArcProps) {
    return null;
}

export function Close(props: CloseProps) {
    return null;
}
