import { ApiResponseStatus } from "@utils/api/ApiResponseStatus";

export type ApiValidationError = {
    [key: string]: string[];
};

export interface IApiError {
    type: string;
    title: string;
    status: ApiResponseStatus;
    traceId: number;
    errors: ApiValidationError;
}
