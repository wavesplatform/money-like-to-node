import { TEST_DATA } from './transactionData';
import { toNode, node } from '../src/transactions';
import { TYPES } from '../src/constants';
import { TTransactionType } from '@waves/ts-types';


describe('From Waves entity to node', () => {

    TEST_DATA.forEach((item, i) => {

        it(`Test ${i}. Test transaction with type ${item.node.type} by function`, () => {
            expect(toNode(item.gui)).toEqual(item.node);
        });

        it(`Test ${i}. Test transaction without timestamp`, () => {
            const data = { ...item.gui };
            delete data.timestamp;

            const nodeData = toNode(data);
            expect(typeof nodeData.timestamp).toBe('number');
            expect((Date.now() - nodeData.timestamp) < 1000).toBe(true);
        });

        const toCamelCase = (str: string): string =>
            str.split('')
                .reduce((acc, item) => {
                    if (item === '_') {
                        acc.nextIsUpper = true;
                    } else if (acc.nextIsUpper) {
                        acc.result += item.toUpperCase();
                        acc.nextIsUpper = false;
                    } else {
                        acc.result += item.toLowerCase();
                    }
                    return acc;
                }, {
                    nextIsUpper: false,
                    result: ''
                }).result;

        const txName: keyof typeof node = Object.entries(TYPES)
            .reduce((result, [key, type]: [string, TTransactionType]): string => {
                return result ? result : type === item.gui.type ? toCamelCase(key) : result;
            }, '') as any;

        it(`Test ${i}. Check ${txName} without type`, () => {
            const data = { ...item.gui };
            delete data.type;

            expect(() => node[txName](data as any)).toThrow('Transaction type is required!');
        });

        it(`Test ${i}. Check ${txName} without version`, () => {
            const data = { ...item.gui };
            delete data.version;

            expect(() => node[txName](data as any)).toThrow('Transaction version is required!');
        });

        it(`Test ${i}. Check ${txName} without senderPublicKey`, () => {
            const data = { ...item.gui };
            delete data.senderPublicKey;

            expect(() => node[txName](data as any)).toThrow('Transaction senderPublicKey is required!');
        });

    });

});
