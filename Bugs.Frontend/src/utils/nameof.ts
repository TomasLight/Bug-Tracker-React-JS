// export const nameof = obj => obj.toString().match(/[.](\w+)/)[1];
export function nameof(expression: () => any): string {
    if (typeof(expression) !== "function") {
        return undefined;
    }

    const mathes = expression.toString().match(/(?=[^.]*$)(\w+)/g);
    return mathes[0];
}