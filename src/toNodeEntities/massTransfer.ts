import { TYPES } from '../constants';
import { IMassTransferItem, IMassTransferTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { emptyError, getAssetId, getCoins, has, ifElse, map, pipe, prop } from '../utils';


const remapTransferItem = factory<IWavesGuiMassTransferItem<TMoney | TLong>, IMassTransferItem<string>>({
    recipient: prop('recipient'),
    amount: pipe<IWavesGuiMassTransferItem<TMoney | TLong>, TMoney | TLong, string>(prop('amount'), getCoins)
});

const getFirstMassTransferItem = (list: Array<IWavesGuiMassTransferItem<TMoney>>): IWavesGuiMassTransferItem<TMoney> => {
    if (!list.length) {
        throw new Error('MassTransfer transaction must have one transfer!');
    }
    return list[0];
};

export const massTransfer = factory<TWavesGuiMassTransfer, TWithPartialFee<IMassTransferTransaction<string>>>({
    ...getDefaultTransform(),
    transfers: pipe(prop('transfers'), map(remapTransferItem)),
    assetId: pipe<TWavesGuiMassTransfer, string, string>(
        ifElse<TWavesGuiMassTransfer, string, string>(
            has('assetId'),
            prop<any, 'assetId'>('assetId'),
            pipe<any, Array<IWavesGuiMassTransferItem<TMoney>>, IWavesGuiMassTransferItem<TMoney>, TMoney, string>(
                prop<any, 'transfers'>('transfers'),
                getFirstMassTransferItem,
                prop<IWavesGuiMassTransferItem<TMoney>, 'amount'>('amount'),
                getAssetId
            )
        ),
        emptyError('Has no assetId!')
    ),
    attachment: prop('attachment')
});

export interface IWavesGuiMassTransferMoney extends IDefaultGuiTx<typeof TYPES.MASS_TRANSFER> {
    attachment: string;
    transfers: Array<IWavesGuiMassTransferItem<TMoney>>;
}

export interface IWavesGuiMassTransferLong extends IDefaultGuiTx<typeof TYPES.MASS_TRANSFER> {
    attachment: string;
    assetId: string;
    transfers: Array<IWavesGuiMassTransferItem<TLong>>;
}

export type TWavesGuiMassTransfer = IWavesGuiMassTransferMoney | IWavesGuiMassTransferLong;

interface IWavesGuiMassTransferItem<T extends TMoney | TLong> {
    recipient: string;
    amount: T;
}
