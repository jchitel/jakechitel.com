import React from "react";
import { isElementOfType, normalizeChildren } from "../react";

type PathProps = React.SVGProps<SVGPathElement>;

/**
 * A layer over the native SVG `<path />` that allows the path commands
 * to be specified as React elements instead of the native string-based syntax.
 */
export default function Path({ d, children, ...props }: PathProps) {
    const def = d ?? extractPathDefFromJsx(children);

    return <path d={def} {...props} />;
}

type AbsOrRel =
    | {
          /** If true, the points of this command are absolute within the SVG view box. */
          abs?: true;
          /** If true, the points of this command are relative to the end point of the previous command. */
          rel?: never;
      }
    | {
          /** If true, the points of this command are relative to the end point of the previous command. */
          rel: true;
          /** If true, the points of this command are absolute within the SVG view box. */
          abs?: never;
      };

type MoveProps = AbsOrRel & {
    /** The x coordinate of the point to move to */
    x: number;
    /** The y coordinate of the point to move to */
    y: number;
};

/**
 * Move the current point to another location without drawing any lines.
 */
export const Move = (_: MoveProps) => null;
const isMove = isElementOfType(Move);

type LineProps = AbsOrRel & {
    /**
     * The x coordinate of the end point of the line.
     * If the y coordinate is omitted, this will just be a horizontal line.
     */
    x?: number;
    /**
     * The y coordinate of the end point of the line.
     * If the x coordinate is omitted, this will just be a vertical line.
     */
    y?: number;
};

/**
 * Draw a line from the current point to a specified end point.
 */
export const Line = (_: LineProps) => null;
const isLine = isElementOfType(Line);

type CubicProps = AbsOrRel &
    (
        | {
              /** The x coordinate of the end point of the curve. */
              x: number;
              /** The y coordinate of the end point of the curve. */
              y: number;
              /**
               * The x coordinate of the start control point,
               * which controls the curvature near the start of the curve.
               *
               * If the start control point is omitted,
               * it will be mirrored from the end control point of the previous curve.
               */
              csx?: never;
              /**
               * The y coordinate of the start control point,
               * which controls the curvature near the start of the curve.
               *
               * If the start control point is omitted,
               * it will be mirrored from the end control point of the previous curve.
               */
              csy?: never;
              /**
               * The x coordinate of the end control point,
               * which controls the curvature near the end of the curve.
               */
              cex: number;
              /**
               * The y coordinate of the end control point,
               * which controls the curvature near the end of the curve.
               */
              cey: number;
          }
        | {
              /** The x coordinate of the end point of the curve. */
              x: number;
              /** The y coordinate of the end point of the curve. */
              y: number;
              /**
               * The x coordinate of the start control point,
               * which controls the curvature near the start of the curve.
               *
               * If the start control point is omitted,
               * it will be mirrored from the end control point of the previous curve.
               */
              csx: number;
              /**
               * The y coordinate of the start control point,
               * which controls the curvature near the start of the curve.
               *
               * If the start control point is omitted,
               * it will be mirrored from the end control point of the previous curve.
               */
              csy: number;
              /**
               * The x coordinate of the end control point,
               * which controls the curvature near the end of the curve.
               */
              cex: number;
              /**
               * The y coordinate of the end control point,
               * which controls the curvature near the end of the curve.
               */
              cey: number;
          }
    );

/**
 * Draw a cubic bezier curve from the current point to an end point.
 * The curvature is controlled by two "control points",
 * one near the start point and one near the end point.
 *
 * The start control point can be omitted, in which case it is inferred.
 * If the previous command was a bezier curve, the start control point
 * is inferred as the mirror of the end control point of the previous curve
 * across the start point. If the previous command wasn't a bezier curve,
 * the start control point is set equal to the start point.
 */
export const Cubic = (_: CubicProps) => null;
const isCubic = isElementOfType(Cubic);

type QuadProps = AbsOrRel &
    (
        | {
              /** The x coordinate of the end point of the curve. */
              x: number;
              /** The y coordinate of the end point of the curve. */
              y: number;
              /**
               * The x coordinate of the control point,
               * which controls the curvature of the curve.
               *
               * If the control point is omitted,
               * it will be mirrored from the end control point of the previous curve.
               */
              cx?: never;
              /**
               * The y coordinate of the control point,
               * which controls the curvature of the curve.
               *
               * If the control point is omitted,
               * it will be mirrored from the end control point of the previous curve.
               */
              cy?: never;
          }
        | {
              /** The x coordinate of the end point of the curve. */
              x: number;
              /** The y coordinate of the end point of the curve. */
              y: number;
              /**
               * The x coordinate of the control point,
               * which controls the curvature of the curve.
               *
               * If the control point is omitted,
               * it will be mirrored from the end control point of the previous curve.
               */
              cx: number;
              /**
               * The y coordinate of the control point,
               * which controls the curvature of the curve.
               *
               * If the control point is omitted,
               * it will be mirrored from the end control point of the previous curve.
               */
              cy: number;
          }
    );

/**
 * Draw a quadratic bezier curve from the current point to an end point.
 * The curvature is controlled by a "control point".
 * A quadratic bezier curve is the equivalent to a cubic bezier curve
 * where the start and end control points are the same.
 *
 * The control point can be omitted, in which case it is inferred.
 * If the previous command was a bezier curve, the control point
 * is inferred as the mirror of the end control point of the previous curve
 * across the start point. If the previous command wasn't a bezier curve,
 * the control point is set equal to the start point.
 */
export const Quad = (_: QuadProps) => null;
const isQuad = isElementOfType(Quad);

type ArcProps = AbsOrRel & {
    /** The x coordinate of the end point of the arc. */
    x: number;
    /** The y coordinate of the end point of the arc. */
    y: number;
    /** The horizontal radius of the ellipse to use for the arc. */
    rx: number;
    /** The vertical radius of the ellipse to use for the arc. */
    ry: number;
    /**
     * If provided, the ellipse used for the arc is rotated from the base orientation.
     */
    angle?: number;
    /**
     * If true, the long part of the ellipse is used for the arc.
     * If false, the short part of the ellipse is used for the arc.
     */
    largeArc?: boolean;
    /**
     * If true, the provided angle is used to rotate the ellipse counter-clockwise.
     * If false, the provided angle is used to rotate the ellipse clockwise.
     */
    ccw?: boolean;
};

/**
 * Draw an arc from the current point to the end point,
 * using an ellipse to determine the curvature.
 *
 * The ellipse is sized and rotated according to the arguments provided,
 * and positioned according to the start and end points.
 */
export const Arc = (_: ArcProps) => null;
const isArc = isElementOfType(Arc);

/**
 * Draw a straight line from the current point to the original point
 * of the current series of commands, closing the path.
 *
 * This is different from manually drawing a line because the line
 * is joined to the original point.
 */
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
                command = node.props.rel ? "l" : "L";
                if (
                    typeof node.props.x === "number" &&
                    typeof node.props.y === "number"
                ) {
                    command = node.props.rel ? "l" : "L";
                    args = [node.props.x, node.props.y];
                } else if (typeof node.props.x === "number") {
                    command = node.props.rel ? "h" : "H";
                    args = [node.props.x];
                } else if (typeof node.props.y === "number") {
                    command = node.props.rel ? "v" : "V";
                    args = [node.props.y];
                } else {
                    command = "m";
                    args = [0, 0];
                }
            } else if (isCubic(node)) {
                command = node.props.rel
                    ? typeof node.props.csx === "number"
                        ? "c"
                        : "s"
                    : typeof node.props.csx === "number"
                    ? "C"
                    : "S";
                args =
                    typeof node.props.csx === "number" &&
                    typeof node.props.csy === "number"
                        ? [node.props.csx, node.props.csy]
                        : [];
                args.push(
                    node.props.cex,
                    node.props.cey,
                    node.props.x,
                    node.props.y
                );
            } else if (isQuad(node)) {
                command = node.props.rel
                    ? typeof node.props.cx === "number"
                        ? "q"
                        : "t"
                    : typeof node.props.cx === "number"
                    ? "Q"
                    : "T";
                args =
                    typeof node.props.cx === "number" &&
                    typeof node.props.cy === "number"
                        ? [node.props.cx, node.props.cy]
                        : [];
                args.push(node.props.x, node.props.y);
            } else if (isArc(node)) {
                command = node.props.rel ? "a" : "A";
                const {
                    x,
                    y,
                    rx,
                    ry,
                    angle = 0,
                    largeArc = false,
                    ccw = false,
                } = node.props;
                args = [rx, ry, angle, largeArc ? 1 : 0, ccw ? 1 : 0, x, y];
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
