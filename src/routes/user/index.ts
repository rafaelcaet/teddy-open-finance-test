import { cfg } from './../../middlewares/config';
import {
    createOne,
    deleteOne,
    getById,
    update,
} from './user';
/**
 * Exports the users actions routes.
 * @param {*} router
 */
export const user = async (app: any) => {
    app.post('/', createOne);

    // Delete user
    app.delete(
        '/:id',
        cfg.route({ requiresAuth: true }),
        deleteOne,
    );

    app.get('/:id', { preValidation: [app.authenticate] }, getById)
    // Get user
    // app.getLinks('/links', cfg.route({ requiresAuth: true }), getLinks);

    // Update user
    app.put(
        '/:id',
        cfg.route({ requiresAuth: true }),
        update,
    );
};
