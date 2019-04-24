import { TYPES } from '../constants';
import { IAliasTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { prop } from '../utils';
import { TWithPartialFee } from '../types';


export const alias = factory<IWavesGuiAlias, TWithPartialFee<IAliasTransaction<string>>>({
    ...getDefaultTransform(),
    alias: prop('alias')
});

export interface IWavesGuiAlias extends IDefaultGuiTx<typeof TYPES.ALIAS> {
    alias: string;
}