import { expect, test } from "@jest/globals";
import "isomorphic-fetch";

import { Issue } from "@app/Issues/models/Issue";
import { configureMapper } from "@config/mapper/configureMapper";
import { ApiBaseMock } from "@utils/api/ApiBase.mock";
import { ApiResponse } from "@utils/api/ApiResponse";
import { ApiResponseStatus } from "@utils/api/ApiResponseStatus";
import { IssuesApi } from "./IssuesApi";

beforeAll(() => {
    configureMapper();
});

beforeEach(() => {
    Object.setPrototypeOf(IssuesApi, ApiBaseMock);
});

test("__API__ IssuesApi getIssues", () => {
    return IssuesApi.getIssues().then((response: ApiResponse<Issue[]>) => {
        expect(response.statusCode === ApiResponseStatus.Ok);
        expect(response.data).not.toBeNull();
        expect(response.data.length).toBeGreaterThan(0);
    });
});
