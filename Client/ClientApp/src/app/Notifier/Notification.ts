import { OptionsObject } from "notistack";
import { ReactNode } from "react";

// import { HttpException } from "@utils/exceptions/HttpException";
// import { HttpError } from "@utils/http/HttpError";

export class Notification {
    public message: string | ReactNode;
    public options?: OptionsObject;
    public key?: string;

    constructor(messageOrError: string /*| HttpError | HttpException*/, options?: OptionsObject) {
        if (options) {
            this.options = options;
        }
        else {
            this.options = {};
        }

        // if (messageOrError instanceof HttpException) {
        //     this.message = messageOrError.message;
        //     this.options.variant = "error";
        // }
        // else if (messageOrError instanceof HttpError) {
        //     this.message = messageOrError.message;
        //     this.options.variant = messageOrError.isClientError() ? "warning" : "error";
        // }
        // else {
            this.message = messageOrError;
        // }
    }
}
