import { TYPES } from '../constants';
import { ICancelLeaseTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { prop } from '../utils';


export const cancelLease = factory<IWavesGuiCancelLease, ICancelLeaseTransaction<string>>({
    ...getDefaultTransform(),
    leaseId: prop('leaseId')
});

export interface IWavesGuiCancelLease extends IDefaultGuiTx<typeof TYPES.CANCEL_LEASE> {
    leaseId: string;
}