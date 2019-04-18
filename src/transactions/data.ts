import { TYPES } from '../constants';
import { DATA_FIELD_TYPE, IDataTransaction, TDataTransactionEntry } from '@waves/ts-types';
import { factory } from '../core/factory';
import { TLong } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getCoins, map, pipe, prop } from '../utils';


const parseValueByType = (item: TWavesGuiDataTransactionEntry): TDataTransactionEntry<string>['value'] => {
    switch (item.type) {
        case DATA_FIELD_TYPE.BINARY:
        case DATA_FIELD_TYPE.STRING:
        case DATA_FIELD_TYPE.BOOLEAN:
            return item.value;
        case DATA_FIELD_TYPE.INTEGER:
            return getCoins(item.value);
    }
};

const remapDataEntryItem = (item: TWavesGuiDataTransactionEntry): TDataTransactionEntry<string> => ({
    key: prop('key', item),
    type: prop('type', item),
    value: parseValueByType(item)
}) as TDataTransactionEntry<string>;

export const data = factory<IWavesGuiData, IDataTransaction<string>>({
    ...getDefaultTransform(),
    data: pipe(prop('data'), map(remapDataEntryItem))
});

export interface IWavesGuiData extends IDefaultGuiTx<typeof TYPES.DATA> {
    data: Array<TWavesGuiDataTransactionEntry>;
}

type TWavesGuiDataTransactionEntry =
    IWavesGuiDataTransactionEntryInteger |
    IWavesGuiDataTransactionEntryBoolean |
    IWavesGuiDataTransactionEntryString |
    IWavesGuiDataTransactionEntryBinary;

interface IWavesGuiDataTransactionEntryInteger {
    key: string;
    type: typeof DATA_FIELD_TYPE.INTEGER;
    value: TLong;
}

interface IWavesGuiDataTransactionEntryBoolean {
    key: string;
    type: typeof DATA_FIELD_TYPE.BOOLEAN;
    value: boolean;
}

interface IWavesGuiDataTransactionEntryString {
    key: string;
    type: typeof DATA_FIELD_TYPE.STRING;
    value: string;
}

interface IWavesGuiDataTransactionEntryBinary {
    key: string;
    type: typeof DATA_FIELD_TYPE.BINARY;
    value: string;
}
