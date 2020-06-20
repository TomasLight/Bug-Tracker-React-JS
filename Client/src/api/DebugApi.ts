import { ApiBase } from "@utils/api/ApiBase";

export class DebugApi extends ApiBase {
    public static getError() {
        return this.get("/api/debug/error");
    }
}
