import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel";

const getRequestBodyMock = jest.fn();

jest.mock('../../../app/server_app/utils/Utils', () => ({
    getRequestBody: () => getRequestBodyMock()
}));

describe('RegisterHandler test suit', () => {
    let sut: RegisterHandler;

    const request = {
        method: undefined
    }

    const responseMock = {
        statusCode: 0,
        writeHead: jest.fn(),
        write: jest.fn()
    }

    const authorizeMock = {
        registerUser: jest.fn()
    }

    const fakeId = '12345';

    const someAccount = {
        id: '',
        userName: 'someUserName',
        password: 'somePassword'
    }

    beforeEach(() => {
        sut = new RegisterHandler(
            request as any as IncomingMessage,
            responseMock as any as ServerResponse,
            authorizeMock as any as Authorizer
        );
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should return valid account in requests', async() =>{
        request.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce(someAccount);
        authorizeMock.registerUser.mockResolvedValueOnce(fakeId);

        await sut.handleRequest();

        expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.CREATED,
            { 'Content-Type': 'application/json' }
        );

        expect(responseMock.write).toHaveBeenCalledWith(
            JSON.stringify({
                userId: fakeId
            })
        );

    });

    it('should not register invalid accounts in requests', async () => {
        request.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce({});

        await sut.handleRequest();

        expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
        expect(responseMock.writeHead).toBeCalledWith(
            HTTP_CODES.BAD_REQUEST, { 'Content-Type': 'application/json' }
        )
        expect(responseMock.write).toBeCalledWith(
            JSON.stringify(
                'userName and password required'
            )
        )
    });

    it('should do nothing for not supported http methods', async () => {
        request.method = HTTP_METHODS.GET;
        await sut.handleRequest();

        expect(responseMock.writeHead).not.toBeCalled();
        expect(responseMock.write).not.toBeCalled();
        expect(getRequestBodyMock).not.toBeCalled();
    });

});