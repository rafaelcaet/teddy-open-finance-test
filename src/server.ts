// // Dependencies
import fastify from 'fastify';
import cors from '@fastify/cors';
import { router } from './routes';
import db from './database';
import * as dotenv from 'dotenv';

dotenv.config();


process.setMaxListeners(15);
/*
 * Mounts the server
 *
 * @returns {FastifyInstance} app
 */
export default async function mount() {
    const app = fastify({ logger: true, bodyLimit: 8548576 });

    await app.register(cors, {
        methods: 'HEAD, OPTIONS, PUT, POST, PATCH, GET, DELETE',
        allowedHeaders: 'content-type, authorization, x-usr-addr',
        credentials: true,
        maxAge: 1000 * 60 * 24,
        origin: '*',
    });

    /* Register routes */
    await router(app);

    return {
        app,
        database: db.sequelize.sync(),
    };
}

mount().then(async (server) => {
    const port = 3000;
    const host = process.env.HOST;
    const { app } = server;
    app.listen(
        {
            port,
            host,
        },
        (err) => {
            if (err) {
                app.log.error(err);
                process.exit(1);
            }
        },
    );
    app.log.info(`Server listening at ${port}`);
});