import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Path, {
    Arc,
    Close,
    Cubic,
    extractPathDefFromJsx,
    Horizontal,
    Line,
    Move,
    Quad,
    Vertical,
} from "../Path";

describe("SVG Path Component", () => {
    test("renders with children", () => {
        const { container } = render(
            <svg viewBox="0 0 100 100">
                <Path>
                    <Move to={[10, 30]} />
                    <Arc radii={[20, 20]} counterClockwise end={[50, 30]} />
                    <Arc radii={[20, 20]} counterClockwise end={[90, 30]} />
                    <Quad control={[90, 60]} end={[50, 90]} />
                    <Quad control={[10, 60]} end={[10, 30]} />
                    <Close />
                </Path>
            </svg>
        );

        expect(container).toContainHTML(
            '<path d="M10 30A20 20 0 0 1 50 30A20 20 0 0 1 90 30Q90 60 50 90Q10 60 10 30z" />'
        );
    });

    test("prefer the d prop", () => {
        const { container } = render(
            <svg viewBox="0 0 100 100">
                <Path d="z">
                    <Move to={[10, 30]} />
                    <Arc radii={[20, 20]} counterClockwise end={[50, 30]} />
                    <Arc radii={[20, 20]} counterClockwise end={[90, 30]} />
                    <Quad control={[90, 60]} end={[50, 90]} />
                    <Quad control={[10, 60]} end={[10, 30]} />
                    <Close />
                </Path>
            </svg>
        );

        expect(container).toContainHTML('<path d="z" />');
    });

    describe("extractPathDefFromJsx", () => {
        test("returns undefined for no usable children", () => {
            expect(
                extractPathDefFromJsx([null, <></>, true, false])
            ).toBeUndefined();
        });

        test("throw for invalid nodes", () => {
            expect(() => extractPathDefFromJsx("Hello")).toThrow(
                "Invalid child 'Hello' for <Path />"
            );
        });

        test("handle move commands", () => {
            expect(extractPathDefFromJsx(<Move to={[1, 2]} />)).toBe("M1 2");
            expect(extractPathDefFromJsx(<Move rel to={[1, 2]} />)).toBe(
                "m1 2"
            );
        });

        test("handle line commands", () => {
            expect(extractPathDefFromJsx(<Line end={[1, 2]} />)).toBe("L1 2");
            expect(extractPathDefFromJsx(<Line rel end={[1, 2]} />)).toBe(
                "l1 2"
            );
        });

        test("handle horizontal commands", () => {
            expect(extractPathDefFromJsx(<Horizontal x={1} />)).toBe("H1");
            expect(extractPathDefFromJsx(<Horizontal rel x={1} />)).toBe("h1");
        });

        test("handle vertical commands", () => {
            expect(extractPathDefFromJsx(<Vertical y={1} />)).toBe("V1");
            expect(extractPathDefFromJsx(<Vertical rel y={1} />)).toBe("v1");
        });

        test("handle cubic commands", () => {
            expect(
                extractPathDefFromJsx(
                    <Cubic
                        abs
                        controlStart={[1, 2]}
                        controlEnd={[3, 4]}
                        end={[5, 6]}
                    />
                )
            ).toBe("C1 2 3 4 5 6");
            expect(
                extractPathDefFromJsx(
                    <Cubic
                        rel
                        controlStart={[1, 2]}
                        controlEnd={[3, 4]}
                        end={[5, 6]}
                    />
                )
            ).toBe("c1 2 3 4 5 6");
            expect(
                extractPathDefFromJsx(
                    <Cubic controlEnd={[3, 4]} end={[5, 6]} />
                )
            ).toBe("S3 4 5 6");
            expect(
                extractPathDefFromJsx(
                    <Cubic rel controlEnd={[3, 4]} end={[5, 6]} />
                )
            ).toBe("s3 4 5 6");
        });

        test("handle quad commands", () => {
            expect(
                extractPathDefFromJsx(<Quad control={[1, 2]} end={[3, 4]} />)
            ).toBe("Q1 2 3 4");
            expect(
                extractPathDefFromJsx(
                    <Quad rel control={[1, 2]} end={[3, 4]} />
                )
            ).toBe("q1 2 3 4");
            expect(extractPathDefFromJsx(<Quad end={[3, 4]} />)).toBe("T3 4");
            expect(extractPathDefFromJsx(<Quad rel end={[3, 4]} />)).toBe(
                "t3 4"
            );
        });

        test("handle arc commands", () => {
            expect(
                extractPathDefFromJsx(
                    <Arc
                        abs
                        end={[1, 2]}
                        radii={[3, 4]}
                        angle={5}
                        largeArc
                        counterClockwise
                    />
                )
            ).toBe("A3 4 5 1 1 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc
                        rel
                        end={[1, 2]}
                        radii={[3, 4]}
                        angle={5}
                        largeArc
                        counterClockwise
                    />
                )
            ).toBe("a3 4 5 1 1 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc end={[1, 2]} radii={[3, 4]} angle={5} largeArc />
                )
            ).toBe("A3 4 5 1 0 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc rel end={[1, 2]} radii={[3, 4]} angle={5} largeArc />
                )
            ).toBe("a3 4 5 1 0 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc
                        abs
                        end={[1, 2]}
                        radii={[3, 4]}
                        angle={5}
                        counterClockwise
                    />
                )
            ).toBe("A3 4 5 0 1 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc
                        rel
                        end={[1, 2]}
                        radii={[3, 4]}
                        angle={5}
                        counterClockwise
                    />
                )
            ).toBe("a3 4 5 0 1 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc end={[1, 2]} radii={[3, 4]} angle={5} />
                )
            ).toBe("A3 4 5 0 0 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc rel end={[1, 2]} radii={[3, 4]} angle={5} />
                )
            ).toBe("a3 4 5 0 0 1 2");
        });

        test("handle close command", () => {
            expect(extractPathDefFromJsx(<Close />)).toBe("z");
        });
    });
});
