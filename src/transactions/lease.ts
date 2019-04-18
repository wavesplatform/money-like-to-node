import { TYPES } from '../constants';
import { ILeaseTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TMoney } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getCoins, pipe, prop } from '../utils';


export const lease = factory<IWavesGuiLease, ILeaseTransaction<string>>({
    ...getDefaultTransform(),
    amount: pipe(prop('amount'), getCoins),
    recipient: prop('recipient')
});

export interface IWavesGuiLease extends IDefaultGuiTx<typeof TYPES.LEASE> {
    amount: TMoney;
    recipient: string;
}