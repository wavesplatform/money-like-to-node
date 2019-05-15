import { ITransaction, TTransactionType } from '@waves/ts-types';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { emptyError, getCoins, pipe, prop } from '../utils';


export const getDefaultTransform = <TYPE extends TTransactionType, T extends IDefaultGuiTx<TYPE>>(): { [Key in keyof ITransaction<string, TYPE>]: (data: T) => TWithPartialFee<ITransaction<string, TYPE>>[Key] } => ({
    type: pipe(prop('type'), emptyError('Transaction type is required!')),
    version: pipe(prop('version'), emptyError('Transaction version is required!')),
    senderPublicKey: pipe(prop('senderPublicKey'), emptyError('Transaction senderPublicKey is required!')),
    timestamp: pipe(prop('timestamp'), (timestamp: number | undefined): number => timestamp || Date.now()),
    fee: pipe(prop('fee'), getCoins),
});

export interface IDefaultGuiTx<TYPE> {
    type: TYPE;
    version: number;
    fee?: TLong | TMoney;
    senderPublicKey?: string;
    timestamp?: number;
}
