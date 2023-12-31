import { DataBase } from "../../../app/server_app/data/DataBase";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { Account } from "../../../app/server_app/model/AuthModel";

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
    return {
        DataBase : jest.fn().mockImplementation(() => {
            return {
                insert: insertMock,
                getBy: getByMock
            }
        })
    }
});

describe('UserCredentialsDataAccess test suit', () => {
    let sut: UserCredentialsDataAccess;
    const someAccount: Account = {
        id: '',
        password: 'somePassword',
        userName: 'someUserName'
    }

    const fakeId = '1234';

    beforeEach(() => {
        sut = new UserCredentialsDataAccess();
        expect(DataBase).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add user and return the id', async () => {
        insertMock.mockResolvedValueOnce(fakeId);

        const actualId = await sut.addUser(someAccount);

        expect(actualId).toBe(fakeId);
        expect(insertMock).toHaveBeenCalledWith(someAccount);

    });

    it('should get user by id', async () => {
        getByMock.mockResolvedValueOnce(someAccount);

        const actualUser = await sut.getUserById(fakeId);

        expect(actualUser).toEqual(someAccount);
        expect(getByMock).toBeCalledWith('id', fakeId);

    });

    it('should get user by userName', async () => {
        getByMock.mockResolvedValueOnce(someAccount);

        const actualUser = await sut.getUserByUserName(someAccount.userName);

        expect(actualUser).toEqual(someAccount);
        expect(getByMock).toBeCalledWith('userName', someAccount.userName);

    });

});