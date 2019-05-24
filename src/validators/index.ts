export const isBase64 = (value: string): boolean => {
    const regExp = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    return regExp.test(value);
};

export function isString(value: any): boolean {
    return typeof value === 'string';
}

export const required = <T>(value: T | null | undefined): boolean => {
    return value != null;
};

export const charsInDictionary = (dictionary: string) => (value: string) => value.split('').every(char => dictionary.includes(char));

export const createValidator = <T>(validateFunction: (data: T) => boolean, message: string): IValidator<T> => (data: T) => {
    if (validateFunction(data)) {
        return null;
    } else {
        return message;
    }
};

export const requiredValidator: <T>(property: string) => IValidator<T> = (property: string) => createValidator(required, `Property "${property}" is required!`);

export function validate<R>(...validators: Array<IValidator<R>>): (data: R) => R {
    return (data: R) => {

        const errors = validators.reduce<Array<string>>((errors, validator) => {
            const message = validator(data);
            if (message) {
                errors.push(message);
            }
            return errors;
        }, []);

        if (errors.length) {
            throw new Error(`Validation error! Details: ${JSON.stringify(errors, null, 4)}`);
        }

        return data;
    };
}

interface IValidator<T> {
    (data: T): string | null;
}
