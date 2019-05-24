import { ITransaction, TTransactionType } from '@waves/ts-types';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getCoins, pipe, prop } from '../utils';
import { requiredValidator, validate } from '../validators';


const processTimestamp = (timestamp: number | undefined): number => timestamp || Date.now();


export const getDefaultTransform = <TYPE extends TTransactionType, T extends IDefaultGuiTx<TYPE>>(): { [Key in keyof ITransaction<string, TYPE>]: (data: T) => ITransaction<string, TYPE>[Key] } => ({
    type: pipe(
        prop('type'),
        validate(requiredValidator('type'))
    ),
    version: pipe(
        prop('version'),
        validate(requiredValidator('version'))
    ),
    senderPublicKey: pipe(
        prop('senderPublicKey'),
        validate(requiredValidator('senderPublicKey'))
    ),
    timestamp: pipe(
        prop('timestamp'),
        processTimestamp
    ),
    fee: pipe(
        prop('fee'),
        getCoins,
        validate(requiredValidator('fee'))
    )
});

export interface IDefaultGuiTx<TYPE> {
    type: TYPE;
    version: number;
    senderPublicKey: string;
    timestamp?: number;
    fee: TLong | TMoney;
}
