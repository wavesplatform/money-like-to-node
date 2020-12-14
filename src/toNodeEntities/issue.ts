import {TYPES} from '../constants';
import {IIssueTransaction} from '@waves/ts-types';
import {factory} from '../core/factory';
import {TLong, TWithPartialFee} from '../types';
import {getDefaultTransform, IDefaultGuiTx} from './general';
import {getCoins, pipe, prop} from '../utils';

export const issue = factory<IWavesGuiIssue, TWithPartialFee<IIssueTransaction<string>>>({
    ...getDefaultTransform(),
    name: prop('name'),
    description: prop('description'),
    decimals: (data) => prop('decimals', data) || prop('precision', data) || 0,
    quantity: pipe<IWavesGuiIssue, TLong, string>(prop('quantity'), getCoins),
    reissuable: prop('reissuable'),
    chainId: prop('chainId'),
    script: prop('script'),
});

interface IIssue extends IDefaultGuiTx<typeof TYPES.ISSUE> {
    name: string;
    description: string;
    quantity: TLong;
    precision?: number;
    decimals?: number;
    reissuable: boolean;
    chainId: number;
    script?: string | null;
}

export type IWavesGuiIssue = IIssue & { decimals: number } | IIssue & { precision: number };
