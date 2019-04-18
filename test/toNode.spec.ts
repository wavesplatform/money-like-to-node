import { TEST_DATA } from './transactionData';
import { toNode, node } from '../src/transactions';
import { TYPES } from '../src/constants';


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

        if (item.node.type === TYPES.TRANSFER) {

            it(`Test ${i}. Check transfer without type`, () => {
                const data = { ...item.gui };
                delete data.type;

                expect(() => node.transfer(data as any)).toThrow('Transaction type is required!');
            });

            it(`Test ${i}. Check transfer without version`, () => {
                const data = { ...item.gui };
                delete data.version;

                expect(() => node.transfer(data as any)).toThrow('Transaction version is required!');
            });

            it(`Test ${i}. Check transfer without senderPublicKey`, () => {
                const data = { ...item.gui };
                delete data.senderPublicKey;

                expect(() => node.transfer(data as any)).toThrow('Transaction senderPublicKey is required!');
            });
        }

    });

});
