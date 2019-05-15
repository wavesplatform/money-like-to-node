import { TYPES } from '../constants';
import { IReissueTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getAssetId, getCoins, pipe, prop } from '../utils';

export const reissue = factory<IWavesGuiReissue, TWithPartialFee<IReissueTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: pipe<IWavesGuiReissue, TMoney, string>(prop('amount'), getAssetId),
    quantity: pipe<IWavesGuiReissue, TMoney, string>(prop('amount'), getCoins),
    reissuable: prop('reissuable')
});

export interface IWavesGuiReissue extends IDefaultGuiTx<typeof TYPES.REISSUE> {
    amount: TMoney;
    reissuable: boolean;
}