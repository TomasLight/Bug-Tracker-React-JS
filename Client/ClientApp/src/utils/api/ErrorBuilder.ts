import { IApiError } from "@utils/api/IApiError";

export class ErrorBuilder {
    public static getErrorMessage(apiError: IApiError): string {
        const keys = Object.keys(apiError.errors);
        const errors: string[] = [];

        keys.forEach((propertyName: string) => {
            const propertyErrors = apiError.errors[propertyName].join(". \n");
            errors.push(propertyErrors);
        });

        const errorMessage = errors.join(". ");
        return errorMessage;
    }
}
