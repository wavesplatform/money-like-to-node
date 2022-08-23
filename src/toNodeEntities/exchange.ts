import { TYPES } from '../constants';
import { IExchangeTransaction, IExchangeTransactionOrderWithProofs } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getAssetId, getCoins, pipe, prop } from '../utils';


const getAssetPair = factory<IWavesGuiExchangeOrder, { amountAsset: string; priceAsset: string; }>({
    amountAsset: pipe<IWavesGuiExchangeOrder, TMoney, string>(prop('amount'), getAssetId),
    priceAsset: pipe<IWavesGuiExchangeOrder, TMoney, string>(prop('price'), getAssetId)
});

export const remapOrder = factory<IWavesGuiExchangeOrder, IExchangeTransactionOrderWithProofs<string>>({
    version: prop('version'),
    matcherPublicKey: prop('matcherPublicKey'),
    orderType: prop('orderType'),
    timestamp: prop('timestamp'),
    expiration: prop('expiration'),
    senderPublicKey: prop('senderPublicKey'),
    proofs: prop('proofs'),
    price: pipe<IWavesGuiExchangeOrder, TMoney, string>(prop('price'), getCoins),
    amount: pipe<IWavesGuiExchangeOrder, TMoney, string>(prop('amount'), getCoins),
    matcherFee: pipe<IWavesGuiExchangeOrder, TMoney, string>(prop('matcherFee'), getCoins),
    matcherFeeAssetId: pipe<IWavesGuiExchangeOrder, TMoney, string>(prop('matcherFee'), getAssetId),
    assetPair: getAssetPair,
    // @ts-ignore
    chainId: prop('chainId'), // todo update @waves/ts-types lib
    // @ts-ignore
    priceMode: prop('priceMode'),
});

export const exchange = factory<IWavesGuiExchange, TWithPartialFee<IExchangeTransaction<string>>>({
    ...getDefaultTransform(),
    buyOrder: pipe(prop('buyOrder'), remapOrder),
    sellOrder: pipe(prop('sellOrder'), remapOrder),
    price: pipe<IWavesGuiExchange, TLong, string>(prop('price'), getCoins),
    amount: pipe<IWavesGuiExchange, TLong, string>(prop('amount'), getCoins),
    buyMatcherFee: pipe<IWavesGuiExchange, TMoney, string>(prop('buyMatcherFee'), getCoins),
    sellMatcherFee: pipe<IWavesGuiExchange, TMoney, string>(prop('sellMatcherFee'), getCoins),
});

export interface IWavesGuiExchange extends IDefaultGuiTx<typeof TYPES.EXCHANGE> {
    buyOrder: IWavesGuiExchangeOrder;
    sellOrder: IWavesGuiExchangeOrder;
    price: TLong;
    amount: TLong;
    buyMatcherFee: TMoney;
    sellMatcherFee: TMoney;
}

export interface IWavesGuiExchangeOrder {
    version: number;
    matcherPublicKey: string;
    orderType: 'buy' | 'sell';
    price: TMoney;
    amount: TMoney;
    matcherFee: TMoney;
    timestamp: number;
    expiration: number;
    senderPublicKey: string;
    proofs: Array<string>;
    chainId?: number;
    priceMode?: 'fixedDecimals' | 'assetDecimals'
}
