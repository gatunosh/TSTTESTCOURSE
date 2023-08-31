import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";


type someTypeWithId = {
    id: string,
    name: string,
    color: string
}

describe('Database test suit', () => {

    let sut: DataBase<someTypeWithId>;
    const fakeId = '1234';
    const someObject1 = {
        id: '',
        name: 'someName',
        color: 'blue'
    }
    const someObject2 = {
        id: '',
        name: 'someName',
        color: 'blue'
    }

    beforeEach(() => {
        sut = new DataBase<someTypeWithId>();
        jest.spyOn(IdGenerator, 'generateRandomId').mockImplementation(() => {
            return fakeId;
        });

    });

    it('should return id after insert', async() => {

        const actual = await sut.insert(someObject1);

        expect(actual).toBe(fakeId);

    });

    it('should get element after insert', async() => {
        const id = await sut.insert(someObject1);

        const actual = await sut.getBy('id', id);

        expect(actual).toEqual(someObject1);
    });

    it('should find all elements with the same property', async() => {
        await sut.insert(someObject1);
        await sut.insert(someObject2);
        
        const expected = [someObject1, someObject2];
        const actual = await sut.findAllBy('color', 'blue');

        expect(actual).toHaveLength(2);
        expect(actual).toEqual(expected);

    });

    it('should change the color of object', async() => {
        const id = await sut.insert(someObject1);
        const expectedColor = 'red';

        await sut.update(id, 'color', expectedColor);

        const actual = await sut.getBy('id', id);

        expect(actual.color).toBe(expectedColor);
    });

    it('should delete object', async() => {
        const id = await sut.insert(someObject1);

        await sut.delete(id);

        const actual = await sut.getBy('id', id);

        expect(actual).toBeUndefined();
    });

    it('should get all elements', async() => {
        await sut.insert(someObject1);
        await sut.insert(someObject2);
        
        const expectedElements = [someObject1, someObject2];

        const actual = await sut.getAllElements();

        expect(actual).toEqual(expectedElements);

    });

});