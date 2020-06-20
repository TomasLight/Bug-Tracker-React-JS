import { expect, test } from "@jest/globals";
import "isomorphic-fetch";

import { User } from "@app/Users/models/User";
import { configureMapper } from "@config/mapper/configureMapper";
import { ApiBaseMock } from "@utils/api/ApiBase.mock";
import { ApiResponse } from "@utils/api/ApiResponse";
import { ApiResponseStatus } from "@utils/api/ApiResponseStatus";
import { UsersApi } from "./UsersApi";

beforeAll(() => {
    configureMapper();
});

beforeEach(() => {
    Object.setPrototypeOf(UsersApi, ApiBaseMock);
});

test("__API__ UsersApi getUsers", () => {
    return UsersApi.getUsers().then((response: ApiResponse<User[]>) => {
        expect(response.statusCode === ApiResponseStatus.Ok);
        expect(response.data).not.toBeNull();
        expect(response.data.length).toBeGreaterThan(0);
    });
});

test("__API__ UsersApi getCurrentUser", () => {
    return UsersApi.getCurrentUser().then((response: ApiResponse<User>) => {
        expect(response.statusCode === ApiResponseStatus.Ok);
        expect(response.data).not.toBeNull();
    });
});
