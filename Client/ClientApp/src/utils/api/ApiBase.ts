import { ApiResponse } from "@utils/api/ApiResponse";

export class ApiBase {
    protected static async get<TResponseData>(url: string): Promise<ApiResponse<TResponseData>> {
        const response: Response = await fetch(url);
        const data: TResponseData = await response.json();

        const apiResponse = new ApiResponse<TResponseData>();
        apiResponse.statusCode = response.status;
        apiResponse.data = data;

        return apiResponse;
    }
}
