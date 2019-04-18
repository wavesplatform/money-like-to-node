import { TYPES } from '../constants';
import { ISetAssetScriptTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { prop } from '../utils';


export const setAssetScript = factory<IWavesGuiSetAssetScript, ISetAssetScriptTransaction<string>>({
    ...getDefaultTransform(),
    assetId: prop('assetId'),
    script: prop('script'),
    chainId: prop('chainId'),
});

export interface IWavesGuiSetAssetScript extends IDefaultGuiTx<typeof TYPES.SET_ASSET_SCRIPT> {
    assetId: string;
    script: string;
    chainId: number;
}