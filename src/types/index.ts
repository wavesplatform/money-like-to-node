export interface IMoney {
    readonly asset: {
        readonly id: string;
    }

    toCoins(): string;
}

export interface IMoneyLike {
    readonly coins: string | number;
    readonly assetId: string;
}

export interface IBigNum {
    toFixed: (() => string)
}

export type TWithPartialFee<T extends {fee: string}> = {
    [Key in keyof T]: Key extends 'fee' ? string | null : T[Key];
}


export type TMoney = IMoney | IMoneyLike;
export type TLong = IBigNum | string | number;