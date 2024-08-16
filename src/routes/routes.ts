import { auth } from "./auth";
import { user } from "./user";

/**
 * Creates the array of routes to be set up.
 *
 * @param app fastify instance
 * @returns {array<Promise>} array of promises
 */
export function routes(app: any): Promise<any>[] {
    return [
        app.register(user, { prefix: '/user' }),
        app.register(auth, { prefix: '/auth' })
    ];
}