import {
    IAliasTransaction,
    IBurnTransaction,
    ICancelLeaseTransaction,
    IDataTransaction,
    IExchangeTransaction,
    IIssueTransaction,
    ILeaseTransaction,
    IMassTransferTransaction,
    IReissueTransaction,
    ISetAssetScriptTransaction,
    ISetScriptTransaction,
    ISponsorshipTransaction,
    ITransaction,
    ITransferTransaction,
    TTransaction,
    TTransactionType,
    TTransactionMap
} from '@waves/ts-types';
import { TYPES } from '../constants';


export const defaultConvert = <LONG, T extends ITransaction<string>>(data: T, factory: IFactory<LONG>): { [Key in keyof T]: Key extends 'fee' ? LONG : T[Key] } => {
    return Object.assign({}, data, { fee: factory(data.fee) }) as { [Key in keyof T]: Key extends 'fee' ? LONG : T[Key] };
};

export const issue: IConvert<IIssueTransaction<string>> = <LONG>(tx: IIssueTransaction<string>, factory: IFactory<LONG>) => ({
    ...defaultConvert(tx, factory), quantity: factory(tx.quantity)
});

export const transfer: IConvert<ITransferTransaction<string>> = (tx, factory) => ({
    ...defaultConvert(tx, factory),
    amount: factory(tx.amount)
});

export const reissue: IConvert<IReissueTransaction<string>> = (tx, factory) => ({
    ...defaultConvert(tx, factory),
    quantity: factory(tx.quantity)
});

export const burn: IConvert<IBurnTransaction<string>> = (tx, factory) => ({
    ...defaultConvert(tx, factory),
    quantity: factory(tx.quantity)
});

export const exchange: IConvert<IExchangeTransaction<string>> = (tx, factory) => ({
    ...defaultConvert(tx, factory),
    buyOrder: {
        ...tx.buyOrder,
        price: factory(tx.buyOrder.price),
        amount: factory(tx.buyOrder.amount),
        matcherFee: factory(tx.buyOrder.matcherFee)
    },
    sellOrder: {
        ...tx.buyOrder,
        price: factory(tx.sellOrder.price),
        amount: factory(tx.sellOrder.amount),
        matcherFee: factory(tx.sellOrder.matcherFee)
    },
    amount: factory(tx.amount),
    price: factory(tx.price),
    sellMatcherFee: factory(tx.sellMatcherFee),
    buyMatcherFee: factory(tx.buyMatcherFee),
});

export const lease: IConvert<ILeaseTransaction<string>> = (tx, factory) => ({
    ...defaultConvert(tx, factory),
    amount: factory(tx.amount)
});

export const cancelLease: IConvert<ICancelLeaseTransaction<string>> = (tx, factory) => defaultConvert(tx, factory);

export const alias: IConvert<IAliasTransaction<string>> = (tx, factory) => defaultConvert(tx, factory);

export const massTransfer: IConvert<IMassTransferTransaction<string>> = (tx, factory) => ({
    ...defaultConvert(tx, factory),
    transfers: tx.transfers.map(item => ({ ...item, amount: factory(item.amount) }))
});

export const data: IConvert<IDataTransaction<string>> = (tx, factory) => ({
    ...defaultConvert(tx, factory),
    data: tx.data.map(item => {
        switch (item.type) {
            case 'integer':
                return { ...item, value: factory(item.value) };
            default:
                return item;
        }
    })
});

export const setScript: IConvert<ISetScriptTransaction<string>> = (tx, factory) => defaultConvert(tx, factory);

export const sponsorship: IConvert<ISponsorshipTransaction<string>> = (tx, factory) => ({
    ...defaultConvert(tx, factory),
    minSponsoredAssetFee: factory(tx.minSponsoredAssetFee)
});

export const setAssetScript: IConvert<ISetAssetScriptTransaction<string>> = (tx, factory) => defaultConvert(tx, factory);

export function convert<LONG, TX extends TTransaction<string>, TYPE extends TX['type'] = TX['type']>(tx: TX, factory: IFactory<LONG>): TTransactionMap<LONG>[TYPE];
export function convert<LONG>(tx: TTransaction<string>, factory: IFactory<LONG>): TTransaction<LONG> {
    switch (tx.type) {
        case TYPES.ISSUE:
            return issue(tx, factory);
        case TYPES.TRANSFER:
            return transfer(tx, factory);
        case TYPES.REISSUE:
            return reissue(tx, factory);
        case TYPES.BURN:
            return burn(tx, factory);
        case TYPES.EXCHANGE:
            return exchange(tx, factory);
        case TYPES.LEASE:
            return lease(tx, factory);
        case TYPES.CANCEL_LEASE:
            return cancelLease(tx, factory);
        case TYPES.ALIAS:
            return alias(tx, factory);
        case TYPES.MASS_TRANSFER:
            return massTransfer(tx, factory);
        case TYPES.DATA:
            return data(tx, factory);
        case TYPES.SET_SCRIPT:
            return setScript(tx, factory);
        case TYPES.SPONSORSHIP:
            return sponsorship(tx, factory);
        case TYPES.SET_ASSET_SCRIPT:
            return setAssetScript(tx, factory);
        default:
            throw new Error('Unknown transaction type!');
    }
}

interface IConvert<TX extends TTransaction<string>> {
    <LONG>(data: TX, factory: IFactory<LONG>): TTransactionMap<LONG>[TX['type']]
}

interface IFactory<LONG> {
    (long: string): LONG;
}
