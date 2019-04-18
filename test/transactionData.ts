import { TYPES } from '../src/constants';
import { Asset, Money } from '@waves/data-entities';
import { BigNumber } from '@waves/data-entities/dist/libs/bignumber';
import { TWavesGuiEntity } from '../src/transactions';
import { TTransaction } from '@waves/ts-types';
import { TWithPartialFee } from '../src/types';

export const WAVES_ASSET = new Asset({
    ticker: 'WAVES',
    id: 'WAVES',
    name: 'Waves',
    precision: 8,
    description: '',
    height: 0,
    hasScript: false,
    timestamp: new Date('2016-04-11T21:00:00.000Z'),
    minSponsoredFee: new BigNumber(0),
    sender: '',
    quantity: 10000000000000000,
    reissuable: false
});

export const BTC_ASSET = new Asset({
    id: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS',
    sender: '3PC4roN512iugc6xGVTTM2XkoWKEdSiiscd',
    timestamp: new Date(1480690876160),
    name: 'WBTC',
    quantity: 2100000000000000,
    reissuable: false,
    precision: 8,
    description: 'Bitcoin Token',
    height: 257457
});

export const TEST_DATA = [
    {
        gui: {
            type: TYPES.ISSUE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            fee: new Money(100000000, WAVES_ASSET),
            name: 'test',
            description: 'test description',
            precision: 2,
            quantity: new BigNumber('560164651464654056161651560132'),
            reissuable: true,
            chainId: 87,
            script: null
        },
        node: {
            type: TYPES.ISSUE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            fee: '100000000',
            name: 'test',
            description: 'test description',
            decimals: 2,
            quantity: '560164651464654056161651560132',
            reissuable: true,
            chainId: 87,
            script: null
        }
    } as ITestData,
    {
        gui: {
            type: TYPES.ISSUE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            fee: new Money(100000000, WAVES_ASSET),
            name: 'test',
            description: 'test description',
            precision: 2,
            quantity: '560164651464654056161651560132',
            reissuable: true,
            chainId: 87,
            script: null
        },
        node: {
            type: TYPES.ISSUE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            fee: '100000000',
            name: 'test',
            description: 'test description',
            decimals: 2,
            quantity: '560164651464654056161651560132',
            reissuable: true,
            chainId: 87,
            script: null
        }
    } as ITestData,
    {
        gui: {
            type: TYPES.TRANSFER,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            fee: {
                coins: '1000000',
                assetId: WAVES_ASSET.id
            },
            amount: new Money(100000, BTC_ASSET),
            recipient: 'merry'
        },
        node: {
            type: TYPES.TRANSFER,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            fee: '1000000',
            attachment: '',
            assetId: BTC_ASSET.id,
            amount: '100000',
            feeAssetId: 'WAVES',
            recipient: 'merry'
        }
    } as ITestData,
    {
        gui: {
            type: TYPES.TRANSFER,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            fee: new Money(100, BTC_ASSET),
            amount: new Money(100000, WAVES_ASSET),
            recipient: 'merry'
        },
        node: {
            type: TYPES.TRANSFER,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            fee: '100',
            attachment: '',
            assetId: 'WAVES',
            amount: '100000',
            feeAssetId: BTC_ASSET.id,
            recipient: 'merry'
        }
    } as ITestData,
    {
        gui: {
            type: TYPES.REISSUE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            reissuable: true,
            amount: {
                coins: '10000',
                assetId: BTC_ASSET.id
            }
        },
        node: {
            type: TYPES.REISSUE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            assetId: BTC_ASSET.id,
            quantity: '10000',
            reissuable: true,
            fee: null
        }
    } as ITestData
];

interface ITestData {
    gui: TWavesGuiEntity;
    node: TWithPartialFee<TTransaction<string>>;
}
