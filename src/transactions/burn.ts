import { TYPES } from '../constants';
import { IBurnTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TMoney } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getAssetId, getCoins, pipe, prop } from '../utils';


export const burn = factory<IWavesGuiBurn, IBurnTransaction<string>>({
    ...getDefaultTransform(),
    assetId: pipe<IWavesGuiBurn, TMoney, string>(prop('quantity'), getAssetId),
    quantity: pipe(prop('quantity'), getCoins),
});

export interface IWavesGuiBurn extends IDefaultGuiTx<typeof TYPES.BURN> {
    quantity: TMoney;
}