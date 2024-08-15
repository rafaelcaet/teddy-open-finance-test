import * as createError from 'http-errors';

export class HttpException {
    static factory(code: number, msg?: unknown) {
        return createError(+code, msg || null, { message: msg });
    }

    static badRequest(msg?: string) {
        return createError(400, msg || 'Invalid request');
    }

    static unauthorized(msg?: string) {
        return createError(401, msg || 'Unauthorized');
    }

    static forbidden(msg?: string) {
        return createError(403, msg || 'Forbidden');
    }

    static userAlreadyExists(msg?: string) {
        return createError(409, msg || 'User already exists');
    }

    static unprocessableEntity(msg?: string) {
        return createError(422, msg || 'Unprocessable entity');
    }

    static companyNotFound(msg?: string) {
        return createError(422, msg || 'Company not found');
    }

    static teamNotFound(msg?: string) {
        return createError(422, msg || 'Team not found');
    }

    static userNotFound(msg?: string) {
        return createError(422, msg || 'User not found');
    }
}
