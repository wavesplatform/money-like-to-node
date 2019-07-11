import { TYPES } from '../constants';
import {
    IInvokeScriptCall,
    IInvokeScriptPayment,
    IInvokeScriptTransaction,
    TInvokeScriptCallArgument
} from '@waves/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { defaultTo, getAssetId, getCoins, map, pipe, prop, ifElse } from '../utils';

const isNull = <T extends unknown>(data: T) => data == null;
const defaultNull = () => null;

const processArgument = (data: TInvokeScriptCallArgument<TLong>): TInvokeScriptCallArgument<string> => {
    if (data.type === 'integer') {
        return { type: data.type, value: getCoins(data.value) };
    } else {
        return data;
    }
};

const processCall = factory<IInvokeScriptCall<TLong>, IInvokeScriptCall<string>>({
    function: prop('function'),
    args: pipe<IInvokeScriptCall<TLong>, Array<TInvokeScriptCallArgument<TLong>>, Array<TInvokeScriptCallArgument<string>>>(
        prop('args'),
        map(processArgument)
    )
});

const processPayment = factory<TMoney, IInvokeScriptPayment<string>>({
    amount: getCoins,
    assetId: getAssetId
});

export const invokeScript = factory<IWavesGuiInvokeScript, TWithPartialFee<IInvokeScriptTransaction<string>>>({
    ...getDefaultTransform(),
    chainId: prop('chainId'),
    dApp: prop('dApp'),
    feeAssetId: pipe<IWavesGuiInvokeScript, TMoney | TLong | undefined | null, string | null, string>(prop('fee'), getAssetId, defaultTo('WAVES')),
    call: pipe(
        prop('call'),
        ifElse(
            isNull,
            defaultNull,
            call => processCall(call as IInvokeScriptCall<TLong>)
        )
    ),
    payment: pipe(
        prop('payment'),
        ifElse(
            isNull,
            defaultNull,
            payment => map(processPayment)(payment as Array<TMoney>)
        )
    )
});

export interface IWavesGuiInvokeScript extends IDefaultGuiTx<typeof TYPES.INVOKE_SCRIPT> {
    dApp: string;
    call?: IInvokeScriptCall<TLong> | null | undefined;
    payment?: Array<TMoney> | null | undefined;
    feeAssetId?: string;
    chainId: number;
}
