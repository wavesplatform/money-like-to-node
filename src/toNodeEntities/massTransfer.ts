import { TYPES } from '../constants';
import { IMassTransferItem, IMassTransferTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getAssetId, getCoins, map, pipe, prop } from '../utils';


const remapTransferItem = factory<IWavesGuiMassTransferItem, IMassTransferItem<string>>({
    recipient: prop('recipient'),
    amount: pipe<IWavesGuiMassTransferItem, TMoney, string>(prop('amount'), getCoins)
});

export const massTransfer = factory<IWavesGuiMassTransfer, TWithPartialFee<IMassTransferTransaction<string>>>({
    ...getDefaultTransform(),
    transfers: pipe(prop('transfers'), map(remapTransferItem)),
    assetId: pipe<IWavesGuiMassTransfer, Array<IWavesGuiMassTransferItem>, IWavesGuiMassTransferItem, TMoney, string>(
        prop('transfers'),
        (list: Array<IWavesGuiMassTransferItem>): IWavesGuiMassTransferItem => {
            if (!list.length) {
                throw new Error('MassTransfer transaction must have one transfer!')
            }
            return list[0];
        },
        prop('amount'),
        getAssetId
    ),
    attachment: prop('attachment')
});

export interface IWavesGuiMassTransfer extends IDefaultGuiTx<typeof TYPES.MASS_TRANSFER> {
    attachment?: string;
    transfers: Array<IWavesGuiMassTransferItem>;
}

interface IWavesGuiMassTransferItem {
    recipient: string;
    amount: TMoney;
}
