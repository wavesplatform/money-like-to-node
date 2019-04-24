import { alias, IWavesGuiAlias } from './alias';
import { burn, IWavesGuiBurn } from './burn';
import { cancelLease, IWavesGuiCancelLease } from './cancelLease';
import { data, IWavesGuiData } from './data';
import { exchange, IWavesGuiExchange } from './exchange';
import { issue, IWavesGuiIssue } from './issue';
import { reissue, IWavesGuiReissue } from './reissue';
import { lease, IWavesGuiLease } from './lease';
import { massTransfer, IWavesGuiMassTransfer } from './massTransfer';
import { setAssetScript, IWavesGuiSetAssetScript } from './setAssetScript';
import { setScript, IWavesGuiSetScript } from './setScript';
import { sponsorship, IWavesGuiSponsorship } from './sponsorship';
import { transfer, IWavesGuiTransfer } from './transfer';
import { TTransaction } from '@waves/ts-types';
import { TYPES } from '../constants';
import { TWithPartialFee } from '../types';


export const node = {
    alias, burn, cancelLease,
    data, exchange, issue,
    reissue, lease, massTransfer,
    setAssetScript, setScript, sponsorship,
    transfer
};

export {
    IWavesGuiAlias,
    IWavesGuiBurn,
    IWavesGuiCancelLease,
    IWavesGuiData,
    IWavesGuiExchange,
    IWavesGuiIssue,
    IWavesGuiReissue,
    IWavesGuiLease,
    IWavesGuiMassTransfer,
    IWavesGuiSetAssetScript,
    IWavesGuiSetScript,
    IWavesGuiSponsorship,
    IWavesGuiTransfer,
};

export const toNode = (item: TWavesGuiEntity): TWithPartialFee<TTransaction<string>> => {
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
        default:
            throw new Error('Unknown transaction type!');
    }
};

export type TWavesGuiEntity = IWavesGuiAlias
    | IWavesGuiBurn
    | IWavesGuiCancelLease
    | IWavesGuiData
    | IWavesGuiExchange
    | IWavesGuiIssue
    | IWavesGuiReissue
    | IWavesGuiLease
    | IWavesGuiMassTransfer
    | IWavesGuiSetAssetScript
    | IWavesGuiSetScript
    | IWavesGuiSponsorship
    | IWavesGuiTransfer