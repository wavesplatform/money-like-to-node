import { head, getCoins, getAssetId, curry } from '../src/utils';
import { Money, BigNumber } from '@waves/data-entities';
import { WAVES_ASSET } from './transactionData';


describe('Utils test', () => {

    it('head', () => {
        expect(head([1, 2])).toBe(1);
    });

    it('getCoins', () => {
        expect(getCoins(new Money('100', WAVES_ASSET))).toBe('100');
        expect(typeof getCoins(new Money('100', WAVES_ASSET))).toBe('string');
        expect(getCoins(new BigNumber('100'))).toBe('100');
        expect(typeof getCoins(new BigNumber('100'))).toBe('string');
    });

    it('getCoins', () => {
        expect(getAssetId(new Money('100', WAVES_ASSET))).toBe('WAVES');
    });

    it('curry', () => {
        const f: <T, K extends keyof T>(key: K) => (data: T) => T[K] =
            curry(<T, K extends keyof T>(prop: K, data: T): T[K] => data[prop]) as any;
        const getType = f<{ type?: number }, 'type'>('type');

        const one = getType({ type: 1 });
        const empty = getType({});

        expect(one).toBe(1);
        expect(empty).toBe(undefined);
    });

});
