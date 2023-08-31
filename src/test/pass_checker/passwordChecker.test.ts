import { PasswordChecker, PasswordErrors } from "../../app/pass_checker/passwordChecker";

describe('passwordChecker test suit', () => {

    let sut: PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    });


    it('Password with less than 8 chars is invalid', () => {
        const actual = sut.checkPassword('123456');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.SHORT);
    });

    it('Password with more than 8 chars is valid', () => {
        const actual = sut.checkPassword('123456789');
        expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
    });

    it('Password with not upper case is invalid', () => {
        const actual = sut.checkPassword('abcd');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NOT_UPPER_CASE);
    });

    it('Password with upper case is valid', () => {
        const actual = sut.checkPassword('abcdA');
        expect(actual.reasons).not.toContain(PasswordErrors.NOT_UPPER_CASE);
    });

    it('Password with not lower case is invalid', () => {
        const actual = sut.checkPassword('ABCD');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NOT_LOWER_CASE);
    });

    it('Password with lower case is valid', () => {
        const actual = sut.checkPassword('ABCDr');
        expect(actual.reasons).not.toContain(PasswordErrors.NOT_LOWER_CASE);
    });

    it('Complex password is valid', () => {
        const actual = sut.checkPassword('1234abcD');
        expect(actual.reasons).toHaveLength(0);
        expect(actual.valid).toBe(true);
    });

    it('Admin password with not number is invalid', () => {
        const actual = sut.checkAdminPassword('abcdABCD');
        expect(actual.reasons).toContain(PasswordErrors.NOT_NUMBER)
        expect(actual.valid).toBe(false);
    });

    it('Admin password with number is valid', () => {
        const actual = sut.checkAdminPassword('abcdABCD1');
        expect(actual.reasons).not.toContain(PasswordErrors.NOT_NUMBER)
    });
});