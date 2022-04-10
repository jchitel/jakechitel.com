import { panic } from "..";

describe("utils/index", () => {
    test("panic", () => {
        expect(() => panic("uh oh")).toThrow("uh oh");

        const getSomethingOptional = (): number | null => null;
        expect(() => {
            getSomethingOptional() ?? panic("uh oh");
        }).toThrow("uh oh");
    });
});
