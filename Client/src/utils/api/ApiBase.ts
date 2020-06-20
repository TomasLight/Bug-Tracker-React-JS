import { ApiResponse } from "@utils/api/ApiResponse";
import { ErrorBuilder } from "@utils/api/ErrorBuilder";
import { IApiError } from "@utils/api/IApiError";
import { RequestInitBuilder } from "@utils/api/RequestInitBuilder";

export class ApiBase {
    protected static async get<TResponseData = any>(url: string): Promise<ApiResponse<TResponseData>> {
        const builder = new RequestInitBuilder("GET");
        const response: Response = await fetch(url, builder.build());

        return ApiBase.createResponse<TResponseData>(response);
    }

    protected static async post<TResponseData = any>(url: string, dto: any): Promise<ApiResponse<TResponseData>> {
        const builder = new RequestInitBuilder("POST").appendJson(dto);
        const response: Response = await fetch(url, builder.build());

        return ApiBase.createResponse<TResponseData>(response);
    }

    protected static async put<TResponseData = any>(url: string, dto: any): Promise<ApiResponse<TResponseData>> {
        const builder = new RequestInitBuilder("PUT").appendJson(dto);
        const response: Response = await fetch(url, builder.build());

        return ApiBase.createResponse<TResponseData>(response);
    }

    protected static async delete<TResponseData = any>(url: string, dto?: any): Promise<ApiResponse<TResponseData>> {
        const builder = new RequestInitBuilder("DELETE");
        if (dto) {
            builder.appendJson(dto);
        }

        const response: Response = await fetch(url, builder.build());
        return ApiBase.createResponse<TResponseData>(response);
    }


    private static async createResponse<TResponseData>(response: Response): Promise<ApiResponse<TResponseData>> {
        const apiResponse = new ApiResponse<TResponseData>();
        apiResponse.statusCode = response.status;

        if (response.ok) {
            const data: TResponseData = await response.json();
            apiResponse.data = data;
        }
        else if (ApiBase.isApiError(response)) {
            const apiError: IApiError = await response.json();
            apiResponse.error = ErrorBuilder.getErrorMessage(apiError);
        }
        else {
            const errorMessage: string = await response.text();
            apiResponse.error = errorMessage;
        }

        return apiResponse;
    }

    private static isApiError(response: Response): boolean {
        return response.headers.has("Content-Type")
            && response.headers.get("Content-Type").indexOf("application/problem+json") > -1;
    }
}
