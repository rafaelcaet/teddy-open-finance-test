import { cfg } from './../../middlewares/config';
import {
    createOne,
    deleteOne,
    getLinks,
    update,
} from './user';

/**
 * Exports the users actions routes.
 * @param {*} router
 */
export const user = async (router: any) => {
    // Create user
    router.post('/', cfg.route({ requiresAuth: false }), createOne);

    // Delete user
    router.delete(
        '/:id',
        cfg.route({ requiresAuth: true }),
        deleteOne,
    );

    // Get user
    router.get('/links', cfg.route({ requiresAuth: true }), getLinks);

    // Update user
    router.put(
        '/:id',
        cfg.route({ requiresAuth: true }),
        update,
    );
};
