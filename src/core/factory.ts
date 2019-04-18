export const factory = <T, R extends Record<string, any>>(transform: { [Key in keyof R]: (data: T) => R[Key] }) => (data: T): R => {
    return Object.entries(transform)
        .reduce((acc, [name, transformer]) => Object.assign(acc, { [name]: transformer(data) }), Object.create(null));
};
