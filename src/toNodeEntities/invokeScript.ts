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
import { defaultTo, getAssetId, getCoins, map, pipe, prop } from '../utils';


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
    call: pipe(prop('call'), processCall),
    payment: pipe(
        prop('payment'),
        map(processPayment)
    )
});

export interface IWavesGuiInvokeScript extends IDefaultGuiTx<typeof TYPES.INVOKE_SCRIPT> {
    dApp: string;
    call: IInvokeScriptCall<TLong>;
    payment: Array<TMoney>;
    feeAssetId: string;
    chainId: number;
}
