import { TYPES } from '../constants';
import { IExchangeTransaction, IExchangeTransactionOrder, IWithProofs } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getAssetId, getCoins, pipe, prop } from '../utils';


const getAssetPair = factory<IWavesGioExchangeOrder, { amountAsset: string; priceAsset: string; }>({
    amountAsset: pipe<IWavesGioExchangeOrder, TMoney, string>(prop('amount'), getAssetId),
    priceAsset: pipe<IWavesGioExchangeOrder, TMoney, string>(prop('price'), getAssetId)
});

const remapOrder = factory<IWavesGioExchangeOrder, IExchangeTransactionOrder<string> & IWithProofs>({
    matcherPublicKey: prop('matcherPublicKey'),
    orderType: prop('orderType'),
    timestamp: prop('timestamp'),
    expiration: prop('expiration'),
    senderPublicKey: prop('senderPublicKey'),
    proofs: prop('proofs'),
    price: pipe(prop('price'), getCoins),
    amount: pipe(prop('amount'), getCoins),
    matcherFee: pipe(prop('matcherFee'), getCoins),
    assetPair: getAssetPair
});

export const exchange = factory<IWavesGuiExchange, IExchangeTransaction<string>>({
    ...getDefaultTransform(),
    buyOrder: pipe(prop('buyOrder'), remapOrder),
    sellOrder: pipe(prop('sellOrder'), remapOrder),
    price: pipe(prop('price'), getCoins),
    amount: pipe(prop('amount'), getCoins),
    buyMatcherFee: pipe(prop('buyMatcherFee'), getCoins),
    sellMatcherFee: pipe(prop('sellMatcherFee'), getCoins),
});

export interface IWavesGuiExchange extends IDefaultGuiTx<typeof TYPES.EXCHANGE> {
    buyOrder: IWavesGioExchangeOrder;
    sellOrder: IWavesGioExchangeOrder;
    price: TLong;
    amount: TLong;
    buyMatcherFee: TMoney;
    sellMatcherFee: TMoney;
}

interface IWavesGioExchangeOrder {
    matcherPublicKey: string;
    orderType: 'buy' | 'sell';
    price: TMoney;
    amount: TMoney;
    matcherFee: TMoney;
    timestamp: number;
    expiration: number;
    senderPublicKey: string;
    proofs: Array<string>;
}
