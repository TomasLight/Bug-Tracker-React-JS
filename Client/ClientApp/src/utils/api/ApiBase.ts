import { ApiResponse } from "@utils/api/ApiResponse";

export class ApiBase {
    protected static async get<TResponseData = any>(url: string): Promise<ApiResponse<TResponseData>> {
        const response: Response = await fetch(url);

        const apiResponse = new ApiResponse<TResponseData>();
        apiResponse.statusCode = response.status;

        if (response.ok) {
            const data: TResponseData = await response.json();
            apiResponse.data = data;
        }
        else {
            const errorMessage: string = await response.text();
            apiResponse.error = errorMessage;
        }

        return apiResponse;
    }
}
