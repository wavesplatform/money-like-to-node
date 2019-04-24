import { TYPES } from '../constants';
import { IBurnTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getAssetId, getCoins, pipe, prop } from '../utils';


export const burn = factory<IWavesGuiBurn, TWithPartialFee<IBurnTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: pipe<IWavesGuiBurn, TMoney, string>(prop('quantity'), getAssetId),
    quantity: pipe<IWavesGuiBurn, TMoney, string>(prop('quantity'), getCoins),
});

export interface IWavesGuiBurn extends IDefaultGuiTx<typeof TYPES.BURN> {
    quantity: TMoney;
}