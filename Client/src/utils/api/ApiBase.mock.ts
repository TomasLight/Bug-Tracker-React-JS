import { ApiBase } from "./ApiBase";
import { ApiResponse } from "./ApiResponse";

const localhostBaseUrl = "http://localhost:3000";

export class ApiBaseMock extends ApiBase {
    protected static async get<TResponseData = any>(url: string): Promise<ApiResponse<TResponseData>> {
        return super.get(`${localhostBaseUrl}${url}`);
    }

    protected static async post<TResponseData = any>(url: string, dto: any): Promise<ApiResponse<TResponseData>> {
        return super.post(`${localhostBaseUrl}${url}`, dto);
    }

    protected static async put<TResponseData = any>(url: string, dto: any): Promise<ApiResponse<TResponseData>> {
        return super.put(`${localhostBaseUrl}${url}`, dto);
    }

    protected static async delete<TResponseData = any>(url: string, dto?: any): Promise<ApiResponse<TResponseData>> {
        return super.delete(`${localhostBaseUrl}${url}`, dto);
    }
}
