import { TYPES } from '../constants';
import { ISetScriptTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { prop } from '../utils';
import { TWithPartialFee } from '../types';


export const setScript = factory<IWavesGuiSetScript, TWithPartialFee<ISetScriptTransaction<string>>>({
    ...getDefaultTransform(),
    script: prop('script')
});

export interface IWavesGuiSetScript extends IDefaultGuiTx<typeof TYPES.SET_SCRIPT> {
    script: string | null;
}
