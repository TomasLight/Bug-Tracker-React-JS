import { ApiResponseStatus } from "@utils/api/ApiResponseStatus";

export class ApiResponse<TResponseData> {
    public statusCode: ApiResponseStatus;
    public data: TResponseData;

    constructor() {
        this.statusCode = null;
        this.data = null;
    }
}
