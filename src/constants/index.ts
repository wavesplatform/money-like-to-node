import { TRANSACTION_TYPE } from '@waves/ts-types';


export const TYPES: typeof TRANSACTION_TYPE = {
    GENESIS: 1 as 1,
    PAYMENT: 2 as 2,
    ISSUE: 3 as 3,
    TRANSFER: 4 as 4,
    REISSUE: 5 as 5,
    BURN: 6 as 6,
    EXCHANGE: 7 as 7,
    LEASE: 8 as 8,
    CANCEL_LEASE: 9 as 9,
    ALIAS: 10 as 10,
    MASS_TRANSFER: 11 as 11,
    DATA: 12 as 12,
    SET_SCRIPT: 13 as 13,
    SPONSORSHIP: 14 as 14,
    SET_ASSET_SCRIPT: 15 as 15
};
