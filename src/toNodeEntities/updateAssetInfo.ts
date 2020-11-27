import { TYPES } from '../constants';
import { IUpdateAssetInfoTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { prop } from '../utils';



export const updateAssetInfo = factory<IWavesGuiUpdateAssetInfo, TWithPartialFee<IUpdateAssetInfoTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: prop('assetId'),
    name: prop('name'),
    description: prop('description'),
});

export interface IWavesGuiUpdateAssetInfo extends IDefaultGuiTx<typeof TYPES.UPDATE_ASSET_INFO> {
    assetId: string;
    name: string;
    description: string;
}
