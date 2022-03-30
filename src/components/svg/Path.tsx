interface SvgCoreAttributes {
    id?: string;
    tabIndex?: number;
}

interface SvgStylingAttributes {
    className?: string;
    style?: React.CSSProperties;
}

interface SvgConditionalProcessingAttributes {
    requiredExtensions?: string;
    systemLanguage?: string;
}

interface SvgPresentationAttributes {
    alignmentBaseline?: 'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical' | 'inherit';
    baselineShift?: number | 'sub' | 'super';
    clipPath?: string;
    clipRule?: 'nonzero' | 'evenodd' | 'inherit';
    color?: string;
    colorInterpolation?: 'auto' | 'sRGB' | 'linearRGB';
    colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB';
    cursor?: string;
    direction?: 'ltr' | 'rtl';
    display?: string;
    dominantBaseline?: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    fill?: string;
    fillOpacity?: number | string;
    fillRule?: 'nonzero' | 'evenodd' | 'inherit';
    filter?: string;
    floodColor?: string;
    floodOpacity?: number;
    fontFamily?: string;
    fontSize?: number | string;
    fontSizeAdjust?: number | string;
    fontStretch?: string;
    fontStyle?: 'normal' | 'italic' | 'oblique';
    fontVariant?: string;
    fontWeight?: number | 'normal' | 'bold' | 'bolder' | 'lighter';
    imageRendering?: 'auto' | 'optimizeSpeed' | 'optimizeQuality';
    letterSpacing?: number | string;
    lightingColor?: string;
    markerEnd?: string;
    markerMid?: string;
    markerStart?: string;
    mask?: string;
    opacity?: number;
    overflow?: 'auto' | 'visible' | 'hidden' | 'scroll';
    pointerEvents?: 'bounding-box' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all' | 'none';
    shapeRendering?: 'auto' | 'optimizeSpeed' | 'crispEdges' | 'geometricPrecision';
    stopColor?: string;
    stopOpacity?: number;
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: number | string;
    strokeLinecap?: 'butt' | 'round' | 'square';
    strokeLinejoin?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    strokeMiterlimit?: number;
    strokeOpacity?: number | string;
    strokeWidth?: number | string;
    textAnchor?: 'start' | 'middle' | 'end';
    textDecoration?: string;
    textRendering?: 'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision';
    transform?: string;
    transformOrigin?: string;
    unicodeBidi?: 'normal' | 'embed' | 'isolate' | 'bidi-override' | 'isolate-override' | 'plaintext';
    vectorEffect?: 'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position';
    visibility?: 'visible' | 'hidden' | 'collapse';
    wordSpacing?: number | string;
    writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
}

interface SvgFilterPrimitiveAttributes {
    height?: number | string;
    result?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
}

interface SvgTransferFunctionAttributes {
    type?: string;
    tableValues?: string;
    intercept?: number;
    amplitude?: number;
    exponent?: number;
    offset?: number;
}

interface SvgAnimationTargetElementAttributes {
    href?: string;
}

interface SvgAnimationAttributeTargetAttributes {
    attributeName?: string;
}

interface SvgAnimationTimingAttributes {
    begin?: string;
    dur?: string;
    end?: string;
    min?: string;
    max?: string;
    restart?: 'always' | 'whenNotActive' | 'never';
    repeatCount?: number | 'indefinite';
    repeatDur?: string;
    fill?: 'freeze' | 'remove';
}

interface SvgAnimationValueAttributes {
    calcMode?: 'discrete' | 'linear' | 'paced' | 'spline';
    values?: string;
    keyTimes?: string;
    keySplines?: string;
    from?: number | string;
    to?: number | string;
    by?: number | string;
    autoReverse?: boolean | 'true' | 'false';
    accelerate?: string;
    decelerate?: string;
}

interface SvgAnimationAdditionAttributes {
    additive?: 'replace' | 'sum';
    accumulate?: 'none' | 'sum';
}

interface SvgGlobalEventAttributes {
    oncancel
}

interface PathProps extends SvgCoreAttributes, SvgStylingAttributes, SvgConditionalProcessingAttributes, SvgGlobalEventAttributes {
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

export default function Path(props: PathProps) {
    return (
        <path
            onCanPlay
            onCanPlayCapture
            onCanPlayThrough
            onCanPlayThroughCapture
            onChange
            onChangeCapture
            onClick
            onClickCapture
            onDoubleClick
            onDoubleClickCapture
            onDrag
            onDragCapture
            onDragEnd
            onDragEndCapture
            onDragEnter
            onDragEnterCapture
            onDragLeave
            onDragLeaveCapture
            onDragOver
            onDragOverCapture
            onDragStart
            onDragStartCapture
            onDrop
            onDropCapture
            onDurationChange
            onDurationChangeCapture
            onEmptied
            onEmptiedCapture
            onEnd
        />
    );
}

export function MoveTo(props: MoveToProps) {
    //
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
