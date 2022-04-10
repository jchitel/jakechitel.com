/**
 * Allows an exception to be thrown from an expression context
 *
 * For example:
 *
 * ```ts
 * const x = getSomeOptionalValue() ?? panic("Uh oh");
 * ```
 */
export const panic = (message: string) => {
    throw new Error(message);
};
