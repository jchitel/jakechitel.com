import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Path, {
    Arc,
    Close,
    Cubic,
    extractPathDefFromJsx,
    Line,
    Move,
    Quad,
} from "../Path";

describe("SVG Path Component", () => {
    test("renders with children", () => {
        const { container } = render(
            <svg viewBox="0 0 100 100">
                <Path>
                    <Move x={10} y={30} />
                    <Arc rx={20} ry={20} ccw x={50} y={30} />
                    <Arc rx={20} ry={20} ccw x={90} y={30} />
                    <Quad cx={90} cy={60} x={50} y={90} />
                    <Quad cx={10} cy={60} x={10} y={30} />
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
                    <Move x={10} y={30} />
                    <Arc rx={20} ry={20} ccw x={50} y={30} />
                    <Arc rx={20} ry={20} ccw x={90} y={30} />
                    <Quad cx={90} cy={60} x={50} y={90} />
                    <Quad cx={10} cy={60} x={10} y={30} />
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
            expect(extractPathDefFromJsx(<Move x={1} y={2} />)).toBe("M1 2");
            expect(extractPathDefFromJsx(<Move rel x={1} y={2} />)).toBe(
                "m1 2"
            );
        });

        test("handle line commands", () => {
            expect(extractPathDefFromJsx(<Line x={1} y={2} />)).toBe("L1 2");
            expect(extractPathDefFromJsx(<Line rel x={1} y={2} />)).toBe(
                "l1 2"
            );
        });

        test("handle horizontal commands", () => {
            expect(extractPathDefFromJsx(<Line x={1} />)).toBe("H1");
            expect(extractPathDefFromJsx(<Line rel x={1} />)).toBe("h1");
        });

        test("handle vertical commands", () => {
            expect(extractPathDefFromJsx(<Line y={1} />)).toBe("V1");
            expect(extractPathDefFromJsx(<Line rel y={1} />)).toBe("v1");
        });

        test("handle cubic commands", () => {
            expect(
                extractPathDefFromJsx(
                    <Cubic abs csx={1} csy={2} cex={3} cey={4} x={5} y={6} />
                )
            ).toBe("C1 2 3 4 5 6");
            expect(
                extractPathDefFromJsx(
                    <Cubic rel csx={1} csy={2} cex={3} cey={4} x={5} y={6} />
                )
            ).toBe("c1 2 3 4 5 6");
            expect(
                extractPathDefFromJsx(<Cubic cex={3} cey={4} x={5} y={6} />)
            ).toBe("S3 4 5 6");
            expect(
                extractPathDefFromJsx(<Cubic rel cex={3} cey={4} x={5} y={6} />)
            ).toBe("s3 4 5 6");
        });

        test("handle quad commands", () => {
            expect(
                extractPathDefFromJsx(<Quad cx={1} cy={2} x={3} y={4} />)
            ).toBe("Q1 2 3 4");
            expect(
                extractPathDefFromJsx(<Quad rel cx={1} cy={2} x={3} y={4} />)
            ).toBe("q1 2 3 4");
            expect(extractPathDefFromJsx(<Quad x={3} y={4} />)).toBe("T3 4");
            expect(extractPathDefFromJsx(<Quad rel x={3} y={4} />)).toBe(
                "t3 4"
            );
        });

        test("handle arc commands", () => {
            expect(
                extractPathDefFromJsx(
                    <Arc abs x={1} y={2} rx={3} ry={4} angle={5} largeArc ccw />
                )
            ).toBe("A3 4 5 1 1 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc rel x={1} y={2} rx={3} ry={4} angle={5} largeArc ccw />
                )
            ).toBe("a3 4 5 1 1 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc x={1} y={2} rx={3} ry={4} angle={5} largeArc />
                )
            ).toBe("A3 4 5 1 0 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc rel x={1} y={2} rx={3} ry={4} angle={5} largeArc />
                )
            ).toBe("a3 4 5 1 0 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc abs x={1} y={2} rx={3} ry={4} angle={5} ccw />
                )
            ).toBe("A3 4 5 0 1 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc rel x={1} y={2} rx={3} ry={4} angle={5} ccw />
                )
            ).toBe("a3 4 5 0 1 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc x={1} y={2} rx={3} ry={4} angle={5} />
                )
            ).toBe("A3 4 5 0 0 1 2");
            expect(
                extractPathDefFromJsx(
                    <Arc rel x={1} y={2} rx={3} ry={4} angle={5} />
                )
            ).toBe("a3 4 5 0 0 1 2");
        });

        test("handle close command", () => {
            expect(extractPathDefFromJsx(<Close />)).toBe("z");
        });
    });
});
