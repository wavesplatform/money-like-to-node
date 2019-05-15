import { TYPES } from '../constants';
import { ISponsorshipTransaction } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getAssetId, getCoins, pipe, prop } from '../utils';


export const sponsorship = factory<IWavesGuiSponsorship, TWithPartialFee<ISponsorshipTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: pipe<IWavesGuiSponsorship, TMoney, string>(prop('minSponsoredAssetFee'), getAssetId),
    minSponsoredAssetFee: pipe<IWavesGuiSponsorship, TMoney, string>(prop('minSponsoredAssetFee'), getCoins)
});

export interface IWavesGuiSponsorship extends IDefaultGuiTx<typeof TYPES.SPONSORSHIP> {
    minSponsoredAssetFee: TMoney;
}
