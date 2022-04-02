export interface SvgCoreAttributes {
    id?: string;
    tabIndex?: number;
}

export interface SvgStylingAttributes {
    className?: string;
    style?: React.CSSProperties;
}

export interface SvgConditionalProcessingAttributes {
    requiredExtensions?: string;
    systemLanguage?: string;
}

export interface SvgPresentationAttributes {
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

export interface SvgFilterPrimitiveAttributes {
    height?: number | string;
    result?: string;
    width?: number | string;
    x?: number | string;
    y?: number | string;
}

export interface SvgTransferFunctionAttributes {
    type?: string;
    tableValues?: string;
    intercept?: number;
    amplitude?: number;
    exponent?: number;
    offset?: number;
}

export interface SvgAnimationTargetElementAttributes {
    href?: string;
}

export interface SvgAnimationAttributeTargetAttributes {
    attributeName?: string;
}

export interface SvgAnimationTimingAttributes {
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

export interface SvgAnimationValueAttributes {
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

export interface SvgAnimationAdditionAttributes {
    additive?: 'replace' | 'sum';
    accumulate?: 'none' | 'sum';
}

export interface SvgAnimationEventAttributes {
    onbegin?: () => void;
    onend?: () => void;
    onrepeat?: () => void;
}

export interface SvgDocumentEventAttributes {
    onabort?: () => void;
    onerror?: () => void;
    onresize?: () => void;
    onscroll?: () => void;
    onunload?: () => void;
}

export interface SvgGlobalEventAttributes {
    oncancel?: () => void;
    oncanplay?: () => void;
    oncanplaythrough?: () => void;
    onchange?: () => void;
    onclick?: () => void;
    onclose?: () => void;
    oncuechange?: () => void;
    ondblclick?: () => void;
    ondrag?: () => void;
    ondragend?: () => void;
    ondragenter?: () => void;
    ondragleave?: () => void;
    ondragover?: () => void;
    ondragstart?: () => void;
    ondrop?: () => void;
    ondurationchange?: () => void;
    onemptied?: () => void;
    onended?: () => void;
    onerror?: () => void;
    onfocus?: () => void;
    oninput?: () => void;
    oninvalid?: () => void;
    onkeydown?: () => void;
    onkeypress?: () => void;
    onkeyup?: () => void;
    onload?: () => void;
    onloadeddata?: () => void;
    onloadedmetadata?: () => void;
    onloadstart?: () => void;
    onmousedown?: () => void;
    onmouseenter?: () => void;
    onmouseleave?: () => void;
    onmousemove?: () => void;
    onmouseout?: () => void;
    onmouseover?: () => void;
    onmouseup?: () => void;
    onmousewheel?: () => void;
    onpause?: () => void;
    onplay?: () => void;
    onplaying?: () => void;
    onprogress?: () => void;
    onratechange?: () => void;
    onreset?: () => void;
    onresize?: () => void;
    onscroll?: () => void;
    onseeked?: () => void;
    onseeking?: () => void;
    onselect?: () => void;
    onshow?: () => void;
    onstalled?: () => void;
    onsubmit?: () => void;
    onsuspend?: () => void;
    ontimeupdate?: () => void;
    ontoggle?: () => void;
    onvolumechange?: () => void;
    onwaiting?: () => void;
}

export interface SvgGraphicalEventAttributes {
    onactivate?: () => void;
    onfocusin?: () => void;
    onfocusout?: () => void;
}
