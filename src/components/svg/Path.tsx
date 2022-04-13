import React, { useCallback, useMemo, useLayoutEffect, useRef } from "react";
import { isElementOfType, normalizeChildren } from "../../utils/react";

type PathProps = React.SVGProps<SVGPathElement>;

export default function Path({ d, children, ...props }: PathProps) {
    const def = d ?? extractPathDefFromJsx(children);

    return (
        <path d={def} {...props}>
            {children}
        </path>
    );
}

function extractPathDefFromJsx(children: React.ReactNode): string | undefined {
    const nodes = normalizeChildren(children);
    if (!nodes.length) return undefined;

    return nodes
        .map((node) => {
            if (isMove(node)) {
                if (node.props.absolute) {
                    return `M ${node.props.to.join(',')}`;
                } else {
                    return `m ${node.props.to.join(',')}`;
                }
            } else if (isLine(node)) {
                if (node.props.absolute) {
                    return `L ${node.props.end.join(',')}`;
                } else {
                    return `l ${node.props.},${node.props.dy}`;
                }
            } else if (isHorizontal(node)) {
                if (node.props.absolute) {
                    return `H ${node.props.x}`;
                } else {
                    return `h ${node.props.dx}`;
                }
            } else if (isVertical(node)) {
                if (node.props.absolute) {
                    return `V ${node.props.y}`;
                } else {
                    return `v ${node.props.dy}`;
                }
            } else if (isCubicBezier(node)) {
                if (node.props.absolute) {
                    if (node.props.controlStart) {
                        return `C ${node.props.controlStart.join(',')} ${node.props.controlEnd.join(',')} ${node.props.end.join(',')}`;
                    } else {
                        return `S ${node.props.controlEnd.join(',')} ${node.props.end.join(',')}`;
                    }
                } else {
                    if (node.props.controlStart) {
                        return `c ${node.props.controlStart.join(',')} ${node.props.controlEnd.join(',')} ${node.props.end.join(',')}`;
                    } else {
                        return `s ${node.props.controlEnd.join(',')} ${node.props.end.join(',')}`;
                    }
                }
            }
        })
        .join(" ");
}

type MoveProps =
    | { absolute: true; relative?: false; to: [x: number, y: number] }
    | { relative: true; absolute?: false; to: [dx: number, dy: number] };

export const Move = (_: MoveProps) => null;
const isMove = isElementOfType(Move);

type LineProps =
    | { absolute: true; relative?: false; end: [x: number, y: number] }
    | { relative: true; absolute?: false; end: [dx: number, dy: number] };

export const Line = (_: LineProps) => null;
const isLine = isElementOfType(Line);

type HorizontalProps =
    | { absolute: true; relative?: false; x: number }
    | { relative: true; absolute?: false; dx: number };

export const Horizontal = (_: HorizontalProps) => null;
const isHorizontal = isElementOfType(Horizontal);

type VerticalProps =
    | { absolute: true; relative?: false; y: number }
    | { relative: true; absolute?: false; dy: number };

export const Vertical = (_: VerticalProps) => null;
const isVertical = isElementOfType(Vertical);

type CubicBezierProps =
    | { absolute: true; relative?: false; end: [x: number, y: number]; controlStart?: [x: number, y: number]; controlEnd: [x: number, y: number] }
    | { relative: true; absolute?: false; end: [dx: number, dy: number]; controlStart?: [dx: number, dy: number]; controlEnd: [dx: number, dy: number] };

export const CubicBezier = (_: CubicBezierProps) => null;
const isCubicBezier = isElementOfType(CubicBezier);

export function Arc(props: ArcProps) {
    return null;
}

export function Close(props: CloseProps) {
    return null;
}
