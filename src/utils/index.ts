/** Allows an exception to be thrown from an expression context */
export const panic = (message: string) => {
    throw new Error(message);
};
