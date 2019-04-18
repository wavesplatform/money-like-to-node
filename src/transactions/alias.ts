import { TYPES } from '../constants';
import { IAliasTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { prop } from '../utils';


export const alias = factory<IWavesGuiAlias, IAliasTransaction<string>>({
    ...getDefaultTransform(),
    alias: prop('alias')
});

export interface IWavesGuiAlias extends IDefaultGuiTx<typeof TYPES.ALIAS> {
    alias: string;
}