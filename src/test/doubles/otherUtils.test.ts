import { OtherStringUtils, calculateComplexity, toUpperCaseWithCb } from "../../app/doubles/otherUtils";

describe.skip('OtherUtils test suit', () => {

    describe('OtherStringUtils test with spies', () => {

        let sut: OtherStringUtils;

        beforeEach(() => {
            sut = new OtherStringUtils();
        });

        test('Use spy to track calls', () => {
            const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
            sut.toUpperCase('asa');
            expect(toUpperCaseSpy).toBeCalledWith('asa');
        });

        test('Use spy to track calls to other module', () => {
            const consoleLogSpy = jest.spyOn(console, 'log');
            sut.logString('abc');
            expect(consoleLogSpy).toBeCalledWith('abc');
        });

        test.only('Use spy to replace implementation of a method', () => {
            jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
                console.log('Calling mock implementation')
            });

            sut.callExternalService();

        });

    });



    describe('Tracking callbacks with Jest Mock', () => {

        const callBackMock = jest.fn();

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('calls callback for invalid argument - track calls' , () => {
            const actual = toUpperCaseWithCb('', callBackMock);
            expect(actual).toBeUndefined();
            expect(callBackMock).toBeCalledWith('Invalid argument');
            expect(callBackMock).toHaveBeenCalledTimes(1);
        });

        it('calls callback for valid argument - track calls' , () => {
            const actual = toUpperCaseWithCb('ABC', callBackMock);
            expect(actual).toBe('ABC');
            expect(callBackMock).toBeCalledWith(`Called function with ABC`);
            expect(callBackMock).toHaveBeenCalledTimes(1);
        });
    })

    describe('Tracking callback', () => {

        let cBArgs = [];
        let timesCalled = 0;

        function callBackMock(arg: string) {
            cBArgs.push(arg);
            timesCalled++;
        }

        afterEach(() => {
            cBArgs = [];
            timesCalled = 0;
        });

        it('calls callback for invalid argument - track calls' , () => {
            const actual = toUpperCaseWithCb('', callBackMock);
            expect(actual).toBeUndefined();
            expect(cBArgs).toContain('Invalid argument');
            expect(timesCalled).toBe(1);
        });

        it('calls callback for valid argument - track calls' , () => {
            const actual = toUpperCaseWithCb('ABC', callBackMock);
            expect(actual).toBe('ABC');
            expect(cBArgs).toContain(`Called function with ABC`);
            expect(timesCalled).toBe(1);
        });

    });

    it('ToUpperCase - call callback for invalid argument' , () => {
        const actual = toUpperCaseWithCb('', () => {});
        expect(actual).toBeUndefined();
    });

    it('ToUpperCase - call callback for valid argument' , () => {
        const actual = toUpperCaseWithCb('ABC', () => {});
        expect(actual).toBe('ABC');
    });

    it('Calculates complexity info' ,() => {
        const someInfo = {
            length: 5,
            extraInfo: {
                field1: 'someInfo',
                field2: 'otherInfo'
            }
        }

        const actual = calculateComplexity(someInfo as any);

        expect(actual).toBe(10);

    });
});