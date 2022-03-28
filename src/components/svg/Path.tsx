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
