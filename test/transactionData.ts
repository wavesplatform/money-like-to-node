import { TYPES } from '../src/constants';
import { Asset, Money } from '@waves/data-entities';
import { BigNumber } from '@waves/data-entities/dist/libs/bignumber';
import { TWavesGuiEntity } from '../src/toNodeEntities';
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

export const TEST_DATA: Array<ITestData> = [
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
            quantity: {
                coins: '10000',
                assetId: BTC_ASSET.id
            },
            chainId: 87,
            fee: '10000'
        },
        node: {
            type: TYPES.REISSUE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            assetId: BTC_ASSET.id,
            quantity: '10000',
            reissuable: true,
            fee: '10000',
            chainId: 87
        }
    } as ITestData,
    {
        gui: {
            type: TYPES.REISSUE,
            version: 1,
            assetId: BTC_ASSET.id,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            reissuable: true,
            quantity: '10000',
            chainId: 87,
            fee: '10000'
        },
        node: {
            type: TYPES.REISSUE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            assetId: BTC_ASSET.id,
            quantity: '10000',
            reissuable: true,
            fee: '10000',
            chainId: 87
        }
    } as ITestData,
    {
        gui: {
            type: TYPES.BURN,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            quantity: {
                coins: '10000',
                assetId: BTC_ASSET.id
            },
            fee: '10000'
        },
        node: {
            type: TYPES.BURN,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            assetId: BTC_ASSET.id,
            quantity: '10000',
            fee: '10000'
        }
    } as ITestData,
    {
        gui: {
            type: TYPES.EXCHANGE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            buyOrder: {
                version: 1,
                matcherPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9e',
                orderType: 'buy',
                price: {
                    assetId: WAVES_ASSET.id,
                    coins: '1'
                },
                amount: {
                    assetId: BTC_ASSET.id,
                    coins: '2'
                },
                matcherFee: {
                    assetId: WAVES_ASSET.id,
                    coins: '10000'
                },
                timestamp: 1555398380418,
                expiration: 1555398380418 + 1000 * 60 * 60 * 24,
                senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
                proofs: ['EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c'],
            },
            sellOrder: {
                version: 1,
                matcherPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9e',
                orderType: 'sell',
                price: {
                    assetId: WAVES_ASSET.id,
                    coins: '1'
                },
                amount: {
                    assetId: BTC_ASSET.id,
                    coins: '2'
                },
                matcherFee: {
                    assetId: WAVES_ASSET.id,
                    coins: '10000'
                },
                timestamp: 1555398380418,
                expiration: 1555398380418 + 1000 * 60 * 60 * 24,
                senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
                proofs: ['EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c'],
            },
            price: 1,
            amount: '2',
            buyMatcherFee: {
                assetId: WAVES_ASSET.id,
                coins: '10000'
            },
            sellMatcherFee: {
                assetId: WAVES_ASSET.id,
                coins: '10000'
            },
            fee: {
                assetId: WAVES_ASSET.id,
                coins: '300000'
            }
        },
        node: {
            type: TYPES.EXCHANGE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            buyOrder: {
                matcherPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9e',
                version: 1,
                assetPair: {
                    amountAsset: BTC_ASSET.id,
                    priceAsset: WAVES_ASSET.id
                },
                orderType: 'buy',
                price: '1',
                amount: '2',
                timestamp: 1555398380418,
                expiration: 1555398380418 + 1000 * 60 * 60 * 24,
                matcherFee: '10000',
                senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
                proofs: ['EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c']
            },
            sellOrder: {
                matcherPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9e',
                version: 1,
                assetPair: {
                    amountAsset: BTC_ASSET.id,
                    priceAsset: WAVES_ASSET.id
                },
                orderType: 'sell',
                price: '1',
                amount: '2',
                timestamp: 1555398380418,
                expiration: 1555398380418 + 1000 * 60 * 60 * 24,
                matcherFee: '10000',
                senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
                proofs: ['EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c']
            },
            price: '1',
            amount: '2',
            buyMatcherFee: '10000',
            sellMatcherFee: '10000',
            fee: '300000'
        }
    } as ITestData,
    {
        gui: {
            type: TYPES.LEASE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            amount: {
                assetId: WAVES_ASSET.id,
                coins: '100000000'
            },
            recipient: 'merry',
            fee: '10000'
        },
        node: {
            type: TYPES.LEASE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            amount: '100000000',
            recipient: 'merry',
            fee: '10000'
        }
    },
    {
        gui: {
            type: TYPES.CANCEL_LEASE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            leaseId: '213fdsafsdafdskafsdfds',
            chainId: 87,
            fee: '10000'
        },
        node: {
            type: TYPES.CANCEL_LEASE,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            leaseId: '213fdsafsdafdskafsdfds',
            fee: '10000',
            chainId: 87
        }
    },
    {
        gui: {
            type: TYPES.ALIAS,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            alias: '213fdsafsdafdskafsdfds',
            fee: '10000'
        },
        node: {
            type: TYPES.ALIAS,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            alias: '213fdsafsdafdskafsdfds',
            fee: '10000'
        }
    },
    {
        gui: {
            type: TYPES.MASS_TRANSFER,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            attachment: 'dfasfsdafsdaexe234x2433',
            transfers: [
                {
                    amount: {
                        assetId: WAVES_ASSET.id,
                        coins: '10'
                    },
                    recipient: 'merry'
                }
            ],
            fee: '10000'
        },
        node: {
            type: TYPES.MASS_TRANSFER,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            assetId: WAVES_ASSET.id,
            attachment: 'dfasfsdafsdaexe234x2433',
            transfers: [
                {
                    amount: '10',
                    recipient: 'merry'
                }
            ],
            fee: '10000'
        }
    },
    {
        gui: {
            type: TYPES.DATA,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            data: [
                {
                    key: 'string',
                    type: 'string',
                    value: 'some string'
                },
                {
                    key: 'integer',
                    type: 'integer',
                    value: 12
                },
                {
                    key: 'boolean',
                    type: 'boolean',
                    value: true
                },
                {
                    key: 'binary',
                    type: 'binary',
                    value: 'dfasdr2323rcewvfa'
                }
            ],
            fee: '10000'
        },
        node: {
            type: TYPES.DATA,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            data: [
                {
                    key: 'string',
                    type: 'string',
                    value: 'some string'
                },
                {
                    key: 'integer',
                    type: 'integer',
                    value: '12'
                },
                {
                    key: 'boolean',
                    type: 'boolean',
                    value: true
                },
                {
                    key: 'binary',
                    type: 'binary',
                    value: 'dfasdr2323rcewvfa'
                }
            ],
            fee: '10000'
        }
    } as ITestData,
    {
        gui: {
            type: TYPES.SET_SCRIPT,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            script: '213fdsafsdafdskafsdfds',
            chainId: 87,
            fee: '10000'
        },
        node: {
            type: TYPES.SET_SCRIPT,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            script: '213fdsafsdafdskafsdfds',
            fee: '10000',
            chainId: 87
        }
    },
    {
        gui: {
            type: TYPES.SPONSORSHIP,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            minSponsoredAssetFee: {
                assetId: BTC_ASSET.id,
                coins: '10000'
            },
            fee: '10000'
        },
        node: {
            type: TYPES.SPONSORSHIP,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            assetId: BTC_ASSET.id,
            minSponsoredAssetFee: '10000',
            fee: '10000'
        }
    },
    {
        gui: {
            type: TYPES.SET_ASSET_SCRIPT,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            assetId: BTC_ASSET.id,
            script: '213fdsafsdafdskafsdfds',
            chainId: 87,
            fee: '10000'
        },
        node: {
            type: TYPES.SET_ASSET_SCRIPT,
            version: 1,
            senderPublicKey: 'EM1XUpKdct1eE2mgmdvr4VA4raXMKvYKumCbnArtcQ9c',
            timestamp: 1555398380418,
            assetId: BTC_ASSET.id,
            script: '213fdsafsdafdskafsdfds',
            chainId: 87,
            fee: '10000'
        }
    },
];

interface ITestData {
    gui: TWavesGuiEntity;
    node: TWithPartialFee<TTransaction<string>>;
}
