export const factory = <T, R extends Record<string, any>>(transform: { [Key in keyof R]: (data: T) => R[Key] }) => (data: T): R => {
    const errors: Array<{ message: string; path: string }> = [];
    const result = Object.entries(transform)
        .reduce((acc, [name, transformer]) => {
            try {
                const value = transformer(data);
                return Object.assign(acc, { [name]: value });
            } catch (e) {
                errors.push({
                    path: name,
                    message: e.message
                });
            }
        }, Object.create(null));

    if (errors.length) {
        throw new Error(`Errors: ${JSON.stringify(errors, null, 4)}`);
    }

    return result;
};
