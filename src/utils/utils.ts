import { TLong, TMoney } from '../types';

export function getAssetId(money: TMoney): string;
export function getAssetId(money: TLong | null | undefined): null;
export function getAssetId(money: TMoney | TLong | null | undefined): string | null;
export function getAssetId(money: TMoney | TLong | null | undefined): string | null {
    if (!money || typeof money !== 'object') {
        return null;
    }

    if ('toCoins' in money) {
        return money.asset.id;
    } else if ('assetId' in money) {
        return money.assetId;
    } else {
        return null;
    }
}

export function getCoins(money: TMoney | TLong): string;
export function getCoins(money: null | undefined): null;
export function getCoins(money: TMoney | TLong | undefined | null): string | null;
export function getCoins(money: TMoney | TLong | undefined | null): string | null {
    let result: string;

    if (money == null) {
        return null;
    }

    if (typeof money === 'object') {
        if ('toCoins' in money) {
            result = money.toCoins();
        } else if ('toFixed' in money) {
            result = money.toFixed();
        } else {
            result = money.coins;
        }
    } else {
        result = String(money);
    }
    return result;
}

export const curry: ICurry = (func: (...args: Array<any>) => any) => {
    function loop(callback: (...args: Array<any>) => any, ...local: Array<any>) {
        if (callback.length <= local.length) {
            return callback(...local);
        } else {
            return (...args: Array<any>) => loop(func, ...local.concat(args));
        }
    }

    return (...args: Array<any>) => loop(func, ...args);
};

export const emptyError = <T>(message: string) => (value: T | null | undefined): T | never => {
    if (value == null) {
        throw new Error(message);
    }
    return value as any;
};

export const head = <T>(list: Array<T>): T | undefined => list[0];

export const defaultTo = <T>(value: T) => (data: T | null | undefined): T => data == null ? value : data;

export const map: IMap = curry(<T, R>(cb: (item: T) => R, list: Array<T>): Array<R> => list.map(cb)) as any;

export const prop: IProp = curry(<T, K extends keyof T>(key: K, data: T): T[K] => Object.prototype.hasOwnProperty.call(data, key) ? data[key] : undefined as any) as any;

export const pipe: IPipe = (...processors: Array<Function>) => (initial: any) => processors.reduce((acc, cb) => cb(acc), initial);


interface IMap {
    <T, R>(cb: (item: T) => R, list: Array<T>): Array<R>;

    <T, R>(cb: (item: T) => R): (list: Array<T>) => Array<R>;
}

interface IPipe {
    <A, B, R>(cb1: (a: A) => B, cb2: (b: B) => R): (a: A) => R;

    <A, B, C, R>(cb1: (a: A) => B, cb2: (b: B) => C, cb3: (c: C) => R): (a: A) => R;

    <A, B, C, D, R>(cb1: (a: A) => B, cb2: (b: B) => C, cb3: (c: C) => D, cb4: (c: D) => R): (a: A) => R;

    <A, B, C, D, E, R>(cb1: (a: A) => B, cb2: (b: B) => C, cb3: (c: C) => D, cb4: (c: D) => E, cb5: (data: E) => R): (a: A) => R;
}

interface IProp {
    <T, K extends keyof T>(key: K, data: T): T[K];

    <T, K extends keyof T>(key: K): (data: T) => T[K];
}

interface ICurry {
    <A, B, R>(cb: (a: A, b: B) => R): (a: A, b: B) => R;

    <A, B, R>(cb: (a: A, b: B) => R): (a: A) => (b: B) => R;

    <A, B, C, R>(cb: (a: A, b: B, c: C) => R): (a: A, b: B, c: C) => R;

    <A, B, C, R>(cb: (a: A, b: B, c: C) => R): (a: A, b: B) => (c: C) => R;

    <A, B, C, R>(cb: (a: A, b: B, c: C) => R): (a: A) => (b: B) => (c: C) => R;
}
