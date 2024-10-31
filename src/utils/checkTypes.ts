export function isDefined<T>(value: T | undefined | null): value is T
{
    return <T>value !== undefined && <T>value !== null;
}

export function typeOf<T>(value: unknown, type: string): value is T
{
    return isDefined(value) && typeof value === type;
}

export function isArray<T>(value: unknown): value is T[]
{
    return Array.isArray(value);
}

export function isBoolean(value: unknown): value is boolean
{
    return typeOf(value, 'boolean');
}

export function isFunction(value: unknown): value is Function
{
    return typeOf(value, 'function');
}

export function isNumber(value: unknown): value is number
{
    return typeOf(value, 'number');
}

export function isString(value: unknown): value is string
{
    return typeOf(value, 'string');
}

export function isObject(value: unknown): value is object
{
    return typeOf(value, 'object') && !isFunction(value) && !isArray(value);
}

export const isNumeric = (value: unknown): value is number =>
{
    if (isNumber(value))
    {
        return true;
    }

    if (!isString(value))
    {
        return false;
    }

    return !isNaN(value as any) && !isNaN(parseFloat(value));
};
