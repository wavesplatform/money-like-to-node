import { TYPES } from '../constants';
import { IMassTransferItem, IMassTransferTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TMoney } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { emptyError, getAssetId, getCoins, head, map, pipe, prop } from '../utils';


const remapTransferItem = factory<IWavesGuiMassTransferItem, IMassTransferItem<string>>({
    recipient: prop('recipient'),
    amount: pipe(prop('amount'), getCoins)
});

export const massTransfer = factory<IWavesGuiMassTransfer, IMassTransferTransaction<string>>({
    ...getDefaultTransform(),
    transfers: pipe(prop('transfers'), map(remapTransferItem)),
    assetId: pipe<IWavesGuiMassTransfer, Array<IWavesGuiMassTransferItem>, IWavesGuiMassTransferItem | undefined, TMoney | null, TMoney, string>(
        prop('transfers'),
        head,
        prop('amount'),
        emptyError('MassTransfer transaction must have one transfer!'),
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
