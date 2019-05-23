import { TYPES } from '../constants';
import { IBurnTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { emptyError, getAssetId, getCoins, has, ifElse, pipe, prop } from '../utils';


export const burn = factory<TWavesGuiBurn, TWithPartialFee<IBurnTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: pipe<TWavesGuiBurn, string, string>(
        ifElse<TWavesGuiBurn, string, string>(
            has('assetId'),
            prop<any, 'assetId'>('assetId'),
            pipe<any, TMoney, string>(
                prop<IWavesGuiBurnMoney, 'quantity'>('quantity'),
                getAssetId
            )
        ),
        emptyError('Has no assetId!')
    ),
    quantity: pipe<TWavesGuiBurn, TMoney | TLong, string>(prop('quantity'), getCoins),
    chainId: prop('chainId')
});

export interface IWavesGuiBurnMoney extends IDefaultGuiTx<typeof TYPES.BURN> {
    quantity: TMoney;
    chainId: number;
}

export interface IWavesGuiBurnLong extends IDefaultGuiTx<typeof TYPES.BURN> {
    quantity: TLong;
    assetId: string;
    chainId: number;
}

export type TWavesGuiBurn = IWavesGuiBurnMoney | IWavesGuiBurnLong;
