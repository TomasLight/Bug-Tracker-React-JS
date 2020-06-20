import { IApiError } from "@utils/api/IApiError";

export class ErrorBuilder {
    public static getErrorMessage(apiError: IApiError): string {
        const errors: string[] = [];

        for (const errorMessages of Object.values(apiError.errors)) {
            const message = errorMessages.join(". \n");
            errors.push(message);
        }

        const errorMessage = errors.join(". ");
        return errorMessage;
    }
}
