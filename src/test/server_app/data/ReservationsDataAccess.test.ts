import { DataBase } from "../../../app/server_app/data/DataBase";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";

const insertMock = jest.fn();
const updateMock = jest.fn();
const deleteMock = jest.fn();
const getByMock = jest.fn();
const getAllElementsMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
    return {
        DataBase: jest.fn().mockImplementation(() => {
            return {
                insert: insertMock,
                update: updateMock,
                delete: deleteMock,
                getBy: getByMock,
                getAllElements: getAllElementsMock
            }
        })
    }
});

describe('ReservationsDataAccess test suit', () => {

    let sut: ReservationsDataAccess;
    const someReservation = {
        id: '',
        user: "user1",
        startDate: "startDate",
        endDate:"endDate",
        room: "someRoom"
    }
    const someOtherReservation = {
        id: '',
        user: "user2",
        startDate: "startDate",
        endDate:"endDate",
        room: "someRoom"
    }
    const fakeId = '123456';

    beforeEach(() => {
        sut = new ReservationsDataAccess();
        expect(DataBase).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a reservation', async() => {
        insertMock.mockResolvedValueOnce(fakeId);
        const actual = await sut.createReservation(someReservation);

        expect(actual).toBe(fakeId);
        expect(insertMock).toHaveBeenCalledWith(someReservation);
    });

    it('should make update reservation call', async () => {
        await sut.updateReservation(fakeId, 'endDate', 'someOtherEndDate');

        expect(updateMock).toHaveBeenCalledWith(
            fakeId,
            'endDate',
            'someOtherEndDate'
        );
    });

    it('should make delete reservation call', async () => {
        await sut.deleteReservation(fakeId);

        expect(deleteMock).toHaveBeenCalledWith(fakeId);
    });

    it('should get reservation', async () => {
        getByMock.mockResolvedValueOnce(someReservation);

        const actual = await sut.getReservation(fakeId);

        expect(actual).toEqual(someReservation);
        expect(getByMock).toHaveBeenLastCalledWith('id', fakeId);
    });

    it('should get all reservation', async () => {
        const expectedReservation = [someReservation, someOtherReservation];
        getAllElementsMock.mockResolvedValueOnce(expectedReservation);

        const actual = await sut.getAllReservations();

        expect(actual).toEqual(expectedReservation);
        expect(getAllElementsMock).toHaveBeenCalledTimes(1);
    });

});