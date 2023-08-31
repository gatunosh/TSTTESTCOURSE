jest.mock('../../app/doubles/otherUtils', () => ({
    ...jest.requireActual('../../app/doubles/otherUtils'),
    calculateComplexity: () => { return 10 }
}));

jest.mock('uuid', () => ({
    v4: () => { return '123' }
}))

import * as OtherUtils from '../../app/doubles/otherUtils';

describe('Module tests', () => {


    test('calculate complexity', () => {
        const result = OtherUtils.calculateComplexity({} as any);
        expect(result).toBe(10);
    });

    test('Keep other functions', () => {
        const result = OtherUtils.toUpperCase("abc");
        expect(result).toBe('ABC');
    });

    test('String with id', () => {
        const result = OtherUtils.toLowerCaseWithId('ABC');
        expect(result).toBe('abc123')
    });

});

