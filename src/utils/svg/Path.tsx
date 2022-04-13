import React from "react";
import { isElementOfType, normalizeChildren } from "../react";

type PathProps = React.SVGProps<SVGPathElement>;

export default function Path({ d, children, ...props }: PathProps) {
    const def = d ?? extractPathDefFromJsx(children);

    return <path d={def} {...props} />;
}

type AbsOrRel = { abs?: true; rel?: never } | { rel: true; abs?: never };

type MoveProps = AbsOrRel & { x: number; y: number };

export const Move = (_: MoveProps) => null;
const isMove = isElementOfType(Move);

type LineProps = AbsOrRel & { x?: number; y?: number };

export const Line = (_: LineProps) => null;
const isLine = isElementOfType(Line);

type HorizontalProps = AbsOrRel & { x: number };

export const Horizontal = (_: HorizontalProps) => null;
const isHorizontal = isElementOfType(Horizontal);

type VerticalProps = AbsOrRel & { y: number };

export const Vertical = (_: VerticalProps) => null;
const isVertical = isElementOfType(Vertical);

type CubicProps = AbsOrRel & {
    x: number;
    y: number;
    controlStart?: [x: number, y: number];
    controlEnd: [x: number, y: number];
};

export const Cubic = (_: CubicProps) => null;
const isCubic = isElementOfType(Cubic);

type QuadProps = AbsOrRel & {
    x: number;
    y: number;
    control?: [x: number, y: number];
};

export const Quad = (_: QuadProps) => null;
const isQuad = isElementOfType(Quad);

type ArcProps = AbsOrRel & {
    x: number;
    y: number;
    radii: [rx: number, ry: number];
    angle?: number;
    largeArc?: boolean;
    counterClockwise?: boolean;
};

export const Arc = (_: ArcProps) => null;
const isArc = isElementOfType(Arc);

export const Close = () => null;
const isClose = isElementOfType(Close);

/** @internal */
export function extractPathDefFromJsx(
    children: React.ReactNode
): string | undefined {
    const nodes = normalizeChildren(children);
    if (!nodes.length) return undefined;

    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#path_commands
    return nodes
        .map((node) => {
            let command: string;
            let args: number[];
            if (isMove(node)) {
                command = node.props.rel ? "m" : "M";
                args = [node.props.x, node.props.y];
            } else if (isLine(node)) {
                if (
                    typeof node.props.x === "undefined" &&
                    typeof node.props.y === "undefined"
                ) {
                    command = "m";
                    args = [0, 0];
                } else {
                    command = node.props.rel ? "l" : "L";
                    args = [node.props.x, node.props.y];
                }
            } else if (isHorizontal(node)) {
                command = node.props.rel ? "h" : "H";
                args = [node.props.x];
            } else if (isVertical(node)) {
                command = node.props.rel ? "v" : "V";
                args = [node.props.y];
            } else if (isCubic(node)) {
                command = node.props.rel
                    ? node.props.controlStart
                        ? "c"
                        : "s"
                    : node.props.controlStart
                    ? "C"
                    : "S";
                args = node.props.controlStart ? node.props.controlStart : [];
                args.push(...node.props.controlEnd, ...node.props.end);
            } else if (isQuad(node)) {
                command = node.props.rel
                    ? node.props.control
                        ? "q"
                        : "t"
                    : node.props.control
                    ? "Q"
                    : "T";
                args = node.props.control ? node.props.control : [];
                args.push(...node.props.end);
            } else if (isArc(node)) {
                command = node.props.rel ? "a" : "A";
                const {
                    end,
                    radii,
                    angle = 0,
                    largeArc = false,
                    counterClockwise = false,
                } = node.props;
                args = [
                    ...radii,
                    angle,
                    largeArc ? 1 : 0,
                    counterClockwise ? 1 : 0,
                    ...end,
                ];
            } else if (isClose(node)) {
                command = "z";
                args = [];
            } else {
                throw new Error(
                    `Invalid child '${node.toString()}' for <Path />`
                );
            }

            return command + args.join(" ");
        })
        .join("");
}
