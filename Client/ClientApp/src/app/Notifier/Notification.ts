import { ApiResponse } from "@utils/api/ApiResponse";
import { OptionsObject, VariantType } from "notistack";
import { ReactNode } from "react";

export class Notification {
    public message: string | ReactNode;
    public options?: OptionsObject;
    public key?: string;

    constructor(messageOrApiResponse: string | ApiResponse, options: OptionsObject = {}) {
        this.options = options;

        if (messageOrApiResponse instanceof ApiResponse) {
            this.message = messageOrApiResponse.error;
            this.options.variant = this.chooseVariant(messageOrApiResponse);
        }
        else {
            this.message = messageOrApiResponse;
        }
    }

    private chooseVariant(response: ApiResponse): VariantType {
        if (response.hasClientError()) {
            return "warning";
        }

        return "error";
    }
}
