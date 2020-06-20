import { ApiResponseStatus } from "@utils/api/ApiResponseStatus";

export class ApiResponse<TResponseData = any> {
    public statusCode: ApiResponseStatus;
    public data: TResponseData;
    public error: string;

    constructor() {
        this.statusCode = null;
        this.data = null;
        this.error = "";
    }

    public hasError() {
        return Boolean(this.error);
    }

    public hasClientError() {
        return this.hasError()
            && this.statusCode >= ApiResponseStatus.BadRequest
            && this.statusCode < ApiResponseStatus.InternalServerError
            && !this.hasTimeoutError();
    }

    public hasTimeoutError() {
        return this.hasError()
            && this.statusCode === ApiResponseStatus.RequestTimeout;
    }
}
