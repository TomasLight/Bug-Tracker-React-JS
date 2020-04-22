export class ApiResponse<TResponseData> {
    public statusCode: number;
    public data: TResponseData;

    constructor() {
        this.statusCode = null;
        this.data = null;
    }
}
