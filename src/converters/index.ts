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
    IExchangeTransactionOrderWithProofs,
    IMassTransferItem,
    TDataTransactionEntry,
    IInvokeScriptCall,
    IInvokeScriptTransaction, IInvokeScriptPayment, TInvokeScriptCallArgument
} from '@waves/ts-types';
import { TYPES } from '../constants';
import { isOrder, map } from '../utils';


type TConvertMap<TO, T extends TTransaction<any>> = {
    [TYPES.ISSUE]: TReplaceParam<T, 'fee' | 'quantity', TO>;
    [TYPES.TRANSFER]: TReplaceParam<T, 'fee' | 'amount', TO>;
    [TYPES.REISSUE]: TReplaceParam<T, 'fee' | 'quantity', TO>;
    [TYPES.BURN]: TReplaceParam<T, 'fee' | 'quantity', TO>;
    [TYPES.EXCHANGE]: TReplaceParam<T, 'fee' | 'buyOrder' | 'sellOrder' | 'amount' | 'price' | 'sellMatcherFee' | 'buyMatcherFee', TO>;
    [TYPES.LEASE]: TReplaceParam<T, 'fee' | 'amount', TO>;
    [TYPES.CANCEL_LEASE]: TReplaceParam<T, 'fee', TO>;
    [TYPES.ALIAS]: TReplaceParam<T, 'fee', TO>;
    [TYPES.MASS_TRANSFER]: T extends IMassTransferTransaction<any> ? TReplaceParam<TReplaceParam<T, 'fee', TO>, 'transfers', Array<IMassTransferItem<TO>>> : never;
    [TYPES.DATA]: T extends IDataTransaction<any> ? TReplaceParam<TReplaceParam<T, 'fee', TO>, 'data', Array<TDataTransactionEntry<TO>>> : never;
    [TYPES.SET_SCRIPT]: TReplaceParam<T, 'fee', TO>;
    [TYPES.SPONSORSHIP]: TReplaceParam<T, 'fee' | 'minSponsoredAssetFee', TO>;
    [TYPES.SET_ASSET_SCRIPT]: TReplaceParam<T, 'fee', TO>;
    [TYPES.INVOKE_SCRIPT]: TReplaceParam<TReplaceParam<TReplaceParam<T, 'fee', TO>, 'payment', Array<IInvokeScriptPayment<TO>>>, 'call', IInvokeScriptCall<TO>>;
}

type TReplaceParam<T, KEYS, NEW_VALUE> = {
    [Key in keyof T]: Key extends KEYS ? NEW_VALUE : T[Key];
}

const defaultConvert = <FROM, TO, T extends ITransaction<any>>(data: T, factory: IFactory<FROM, TO>): TReplaceParam<T, 'fee', TO> => {
    return Object.assign({}, data, { fee: factory(data.fee) }) as TReplaceParam<T, 'fee', TO>;
};

export const issue = <FROM, TO, TX extends IIssueTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => ({
    ...defaultConvert(tx, factory), quantity: factory(tx.quantity)
});

export const transfer = <FROM, TO, TX extends ITransferTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => ({
    ...defaultConvert(tx, factory),
    amount: factory(tx.amount)
});

export const reissue = <FROM, TO, TX extends IReissueTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => ({
    ...defaultConvert(tx, factory),
    quantity: factory(tx.quantity)
});

export const burn = <FROM, TO, TX extends IBurnTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => ({
    ...defaultConvert(tx, factory),
    quantity: factory(tx.quantity)
});

export const order = <FROM, TO, O extends IExchangeTransactionOrderWithProofs<FROM>>(data: O, factory: IFactory<FROM, TO>): TReplaceParam<O, 'price' | 'amount' | 'matcherFee', TO> => ({
    ...data,
    price: factory(data.price),
    amount: factory(data.amount),
    matcherFee: factory(data.matcherFee)
} as TReplaceParam<O, 'price' | 'amount' | 'matcherFee', TO>);

export const exchange = <FROM, TO, TX extends IExchangeTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => ({
    ...defaultConvert(tx, factory),
    buyOrder: order(tx.buyOrder, factory),
    sellOrder: order(tx.sellOrder, factory),
    amount: factory(tx.amount),
    price: factory(tx.price),
    sellMatcherFee: factory(tx.sellMatcherFee),
    buyMatcherFee: factory(tx.buyMatcherFee),
});

export const lease = <FROM, TO, TX extends ILeaseTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => ({
    ...defaultConvert(tx, factory),
    amount: factory(tx.amount)
});

export const cancelLease = <FROM, TO, TX extends ICancelLeaseTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => defaultConvert(tx, factory);

export const alias = <FROM, TO, TX extends IAliasTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => defaultConvert(tx, factory);

export const massTransfer = <FROM, TO, TX extends IMassTransferTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => ({
    ...defaultConvert(tx, factory),
    transfers: tx.transfers.map(item => ({ ...item, amount: factory(item.amount) }))
});

export const data = <FROM, TO, TX extends IDataTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => ({
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

export const setScript = <FROM, TO, TX extends ISetScriptTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => defaultConvert(tx, factory);

export const sponsorship = <FROM, TO, TX extends ISponsorshipTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => ({
    ...defaultConvert(tx, factory),
    minSponsoredAssetFee: factory(tx.minSponsoredAssetFee)
});

export const invokeScript = <FROM, TO, TX extends IInvokeScriptTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => ({
    ...defaultConvert(tx, factory),
    payment: tx.payment && tx.payment.map(item => ({ ...item, amount: factory(item.amount) })),
    call: {
        ...tx.call,
        args: tx.call && tx.call.args.map(item => ({
            ...item,
            value: item.type === 'integer' ? factory(item.value) : item.value
        } as TInvokeScriptCallArgument<TO>))
    }
});

export const setAssetScript = <FROM, TO, TX extends ISetAssetScriptTransaction<FROM>>(tx: TX, factory: IFactory<FROM, TO>) => defaultConvert(tx, factory);

export function convert<FROM, TO, TX extends TTransaction<FROM>, TYPE extends TX['type'] = TX['type']>(tx: TX, factory: IFactory<FROM, TO>): TConvertMap<TO, TX>[TYPE];
export function convert<FROM, TO, TX extends IExchangeTransactionOrderWithProofs<FROM>>(tx: TX, factory: IFactory<FROM, TO>): TReplaceParam<TX, 'price' | 'amount' | 'matcherFee', TO>;
export function convert<FROM, TO>(tx: TTransaction<FROM> | IExchangeTransactionOrderWithProofs<FROM>, factory: IFactory<FROM, TO>): TTransaction<TO> | IExchangeTransactionOrderWithProofs<TO> {

    if (isOrder(tx)) {
        return order(tx, factory);
    }

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
        case TYPES.INVOKE_SCRIPT:
            return invokeScript(tx, factory);
        default:
            throw new Error('Unknown transaction type!');
    }
}

interface IFactory<FROM, TO> {
    (long: FROM): TO;
}
