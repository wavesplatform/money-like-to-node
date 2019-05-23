import { TYPES } from '../constants';
import { IReissueTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { emptyError, getAssetId, getCoins, has, ifElse, pipe, prop } from '../utils';

export const reissue = factory<TWavesGuiReissue, TWithPartialFee<IReissueTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: pipe<TWavesGuiReissue, string, string>(
        ifElse<TWavesGuiReissue, string, string>(
            has('assetId'),
            prop<any, 'assetId'>('assetId'),
            pipe<any, TMoney, string>(
                prop('quantity'),
                getAssetId
            )
        ),
        emptyError('Has no assetId!')
    ),
    quantity: pipe<TWavesGuiReissue, TMoney | TLong, string>(prop('quantity'), getCoins),
    reissuable: prop('reissuable'),
    chainId: prop('chainId'),
});

export interface IWavesGuiReissueMoney extends IDefaultGuiTx<typeof TYPES.REISSUE> {
    quantity: TMoney;
    reissuable: boolean;
    chainId: number;
}

export interface IWavesGuiReissueLong extends IDefaultGuiTx<typeof TYPES.REISSUE> {
    assetId: string;
    quantity: TLong;
    reissuable: boolean;
    chainId: number;
}

export type TWavesGuiReissue = IWavesGuiReissueMoney | IWavesGuiReissueLong;
