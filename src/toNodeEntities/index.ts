import { alias, IWavesGuiAlias } from './alias';
import { burn, TWavesGuiBurn } from './burn';
import { cancelLease, IWavesGuiCancelLease } from './cancelLease';
import { data, IWavesGuiData } from './data';
import { exchange, remapOrder as order, IWavesGuiExchangeOrder, IWavesGuiExchange } from './exchange';
import { issue, IWavesGuiIssue } from './issue';
import { reissue, TWavesGuiReissue } from './reissue';
import { lease, IWavesGuiLease } from './lease';
import { massTransfer, TWavesGuiMassTransfer } from './massTransfer';
import { setAssetScript, IWavesGuiSetAssetScript } from './setAssetScript';
import { setScript, IWavesGuiSetScript } from './setScript';
import { sponsorship, IWavesGuiSponsorship } from './sponsorship';
import { transfer, IWavesGuiTransfer } from './transfer';
import { IExchangeTransactionOrderWithProofs, TTransaction, TTransactionMap } from '@waves/ts-types';
import { TYPES } from '../constants';
import { TWithPartialFee } from '../types';
import { isOrder } from '../utils';
import { invokeScript, IWavesGuiInvokeScript } from './invokeScript';


export const node = {
    alias, burn, cancelLease,
    data, exchange, issue,
    reissue, lease, massTransfer,
    setAssetScript, setScript, sponsorship,
    transfer, order, invokeScript
};

export {
    IWavesGuiAlias,
    TWavesGuiBurn,
    IWavesGuiCancelLease,
    IWavesGuiData,
    IWavesGuiExchange,
    IWavesGuiIssue,
    TWavesGuiReissue,
    IWavesGuiLease,
    TWavesGuiMassTransfer,
    IWavesGuiSetAssetScript,
    IWavesGuiSetScript,
    IWavesGuiSponsorship,
    IWavesGuiTransfer,
};

export function toNode(item: IWavesGuiExchangeOrder): IExchangeTransactionOrderWithProofs<string>;
export function toNode<TX extends TWavesGuiEntity, TYPE extends TX['type'] = TX['type']>(item: TX): TWithPartialFee<TTransactionMap<string>[TYPE]>;
export function toNode(item: TWavesGuiEntity | IWavesGuiExchangeOrder): TWithPartialFee<TTransaction<string>> | IExchangeTransactionOrderWithProofs<string> {

    if (isOrder(item)) {
        return order(item);
    }

    switch (item.type) {
        case TYPES.ISSUE:
            return issue(item);
        case TYPES.TRANSFER:
            return transfer(item);
        case TYPES.REISSUE:
            return reissue(item);
        case TYPES.BURN:
            return burn(item);
        case TYPES.EXCHANGE:
            return exchange(item);
        case TYPES.LEASE:
            return lease(item);
        case TYPES.CANCEL_LEASE:
            return cancelLease(item);
        case TYPES.ALIAS:
            return alias(item);
        case TYPES.MASS_TRANSFER:
            return massTransfer(item);
        case TYPES.DATA:
            return data(item);
        case TYPES.SET_SCRIPT:
            return setScript(item);
        case TYPES.SPONSORSHIP:
            return sponsorship(item);
        case TYPES.SET_ASSET_SCRIPT:
            return setAssetScript(item);
        case TYPES.INVOKE_SCRIPT:
            return invokeScript(item);
        default:
            throw new Error('Unknown transaction type!');
    }
}


export type TWavesGuiEntity = IWavesGuiAlias
    | TWavesGuiBurn
    | IWavesGuiCancelLease
    | IWavesGuiData
    | IWavesGuiExchange
    | IWavesGuiIssue
    | TWavesGuiReissue
    | IWavesGuiLease
    | TWavesGuiMassTransfer
    | IWavesGuiSetAssetScript
    | IWavesGuiSetScript
    | IWavesGuiSponsorship
    | IWavesGuiTransfer
    | IWavesGuiInvokeScript;