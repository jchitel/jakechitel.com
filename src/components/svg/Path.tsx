import React from "react";
import { flattenFragments, isElementOfType } from '../../utils/react';
import { SvgConditionalProcessingAttributes, SvgCoreAttributes, SvgGlobalEventAttributes, SvgGraphicalEventAttributes, SvgPresentationAttributes, SvgStylingAttributes } from './attrs';

interface PathProps extends SvgCoreAttributes, SvgStylingAttributes, SvgConditionalProcessingAttributes, SvgGlobalEventAttributes, SvgGraphicalEventAttributes, SvgPresentationAttributes {
    /** The shape of the path (This has precedence over `children`) */
    d?: string;
    /**
     * Override the length that will be used for this path in computations that use it.
     * 
     * This does not change the appearance of the path, it only affects what calculations
     * *observe* the length to be.
     */
    pathLength?: number;
    /**
     * Allows a component-based mechanism for defining a path.
     * Specify the sequence of path commands as a list of React elements,
     * which will then be translated to an actual path string.
     * 
     * If `d` is specified, it will override this prop.
     */
    children?: React.ReactNode;
}

export default function Path({ d, children, ...props }: PathProps) {
    const finalD = d ?? convertPathChildrenToD(children);
    return (
        <path
            {...(props as any)} // TODO: svg attributes in react types are wrong
        />
    );
}

type MoveToProps = AbsoluteMoveToProps | RelativeMoveToProps;

interface AbsoluteMoveToProps {
    absolute?: true;
    x: number;
    y: number;
}

interface RelativeMoveToProps {
    relative: true;
    dx: number;
    dy: number;
}

export function MoveTo(props: MoveToProps) {
    return null;
}

export function LineTo(props: LineToProps) {
    //
}

export function Cubic(props: CubicProps) {
    //
}

export function Quad(props: QuadProps) {
    //
}

export function Arc(props: ArcProps) {
    //
}

export function Close(props: CloseProps) {
    //
}

const convertPathChildrenToD = (children: React.ReactNode): string => {
    const elements = flattenFragments(children);
    const d = '';
    for (const element of elements) {
        if (isElementOfType(element, MoveTo)) {

        }
    }
}


