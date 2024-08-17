import {
    addLink,
    createOne,
    deleteOne,
    getById,
    getLinks,
    update,
} from './user';
/**
 * Exports the users actions routes.
 * @param {*} router
 */
export const user = async (app: any) => {

    app.post('/', createOne);
    app.post('/sendurl', { preValidation: [app.authenticate] }, addLink)

    app.delete(
        '/:id',
        { preValidation: [app.authenticate] },
        deleteOne,
    );

    app.get('/', { preValidation: [app.authenticate] }, getById)
    app.get('/urls', { preValidation: [app.authenticate] }, getLinks);

    app.put(
        '/:id',
        { preValidation: [app.authenticate] },
        update,
    );
};
