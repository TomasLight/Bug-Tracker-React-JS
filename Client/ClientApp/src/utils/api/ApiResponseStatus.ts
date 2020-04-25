export enum ApiResponseStatus {
    Unknown = 0,

    Ok = 200,
    Created = 201,
    NoContent = 204,

    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    RequestTimeout = 408,

    InternalServerError = 500,
    BadGateway = 502,
    ServiceUnavailable = 503,
}
