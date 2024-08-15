import axios from 'axios';
import { FastifyInstance } from 'fastify';
import { IUserSettings } from '../../src/interfaces/common/IUserSettings';
import mount from '../../src/server';
import db from '../../src/database/models';

async function getJWT(wallet: string) {
    const result = await axios({
        method: 'post',
        url: process.env.JWT_AUTH_URL,
        data: {
            wallet,
            signature: process.env.JWT_SIGNATURE,
        },
    });
    return result.data.jwt;
}

/**
 * Gets the last wallet in the user table
 */
async function getWallet() {
    const queryGetId = 'SELECT wallet FROM user ORDER BY id DESC LIMIT 1;';
    const result = await db.sequelize.query(queryGetId);
    return result;
}

/**
 * Gets first wallet where is_admin = 1
 */
async function getAdminWallet() {
    const queryGetId = 'SELECT MIN(wallet) FROM user WHERE is_admin = 1';
    const result = await db.sequelize.query(queryGetId);
    return result;
}

let app: FastifyInstance;
let fakeJwt: string;
let token: string;
let walletTest = `0x1asndre8971264hg24${Math.floor(Math.random() * 11100000)}`;
let wallet: string;
let walletAdmin: string;

describe('User routes', () => {
    beforeAll(async () => {
        const { app: server } = await mount();
        fakeJwt = await getJWT(process.env.JWT_TESTS_FAKE);
        token = await getJWT(process.env.JWT_TESTS as string);
        app = server;
        [[{ wallet: wallet }]] = await getWallet();
        [[{ 'MIN(wallet)': walletAdmin }]] = await getAdminWallet();
    });

    describe('test for user routes', () => {
        describe('POST - Send a request to /user/', () => {
            it('Should response with a 200 status code and create a user record on db', async () => {
                const response = await app.inject({
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    payload: {
                        wallet: walletTest,
                    },
                    path: '/user/',
                });
                expect(response.statusCode).toBe(200);
            });
        });

        describe('POST - Send a request to /user/', () => {
            it('Should response with a 409 status code', async () => {
                const response = await app.inject({
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${fakeJwt}`,
                    },
                    payload: {
                        wallet: walletTest,
                    },
                    path: '/user/',
                });
                expect(response.statusCode).toBe(409);
            });
        });

        describe('POST - Send a request to /user/', () => {
            it('Should response with a 409 status code', async () => {
                const response = await app.inject({
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    payload: {
                        wallet: walletAdmin,
                    },
                    path: '/user/',
                });
                expect(response.statusCode).toBe(409);
            });
        });

        describe('GET - Send a request to /user/:wallet', () => {
            it('Should response with a 200 status code and a user data from db', async () => {
                const response = await app.inject({
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    path: `/user/${walletTest}`,
                });
                expect(response.statusCode).toBe(200);
            });
        });

        describe('GET - Send a request to /user/:wallet', () => {
            it('Should response with a 422 status code', async () => {
                const walletInvalid = '0xinvalidWallet';
                const response = await app.inject({
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    path: `/user/${walletInvalid}`,
                });
                expect(response.statusCode).toBe(422);
            });
        });

        describe('GET - Send a request to /user/:wallet/company', () => {
            it('Should response with a 200 status and all companies from user', async () => {
                const response = await app.inject({
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    path: `/user/${walletAdmin}/company`,
                });
                expect(response.statusCode).toBe(200);
            });
        });

        describe('GET - Send a request to /user/:wallet/company', () => {
            it('Should response with a 422 status', async () => {
                const walletInvalid = '0xinvalidWallet';
                const response = await app.inject({
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    path: `/user/${walletInvalid}/company`,
                });
                expect(response.statusCode).toBe(422);
            });
        });

        describe('GET - Send a request to /user/:wallet/team', () => {
            it('Should response with a 200 status and all teams from user', async () => {
                const response = await app.inject({
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    path: `/user/${walletTest}/team`,
                });
                expect(response.statusCode).toBe(200);
            });
        });

        describe('GET - Send a request to /user/:wallet/team', () => {
            it('Should response with a 422 status', async () => {
                const walletInvalid = '0xinvalidWallet';
                const response = await app.inject({
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    path: `/user/${walletInvalid}/team`,
                });
                expect(response.statusCode).toBe(422);
            });
        });

        describe('PUT - Send a request to /user/:wallet', () => {
            it('Should response with a 200 status code and update a user name and picture recorded on db', async () => {
                const response = await app.inject({
                    method: 'PUT',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    payload: {
                        name: 'newName',
                        picture: null,
                        email: 'cali.update@email.com',
                    },
                    path: `/user/${walletTest}`,
                });
                expect(response.statusCode).toBe(200);
            });
        });

        describe('PUT - Send a request to /user/:wallet', () => {
            it('Should response with a 422 status code and update a user name and picture recorded on db', async () => {
                const response = await app.inject({
                    method: 'PUT',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    payload: {
                        name: 'newName',
                        picture: 'newPicture.png',
                        email: 'cali.update@email.com',
                    },
                    path: `/user/${walletTest}`,
                });
                expect(response.statusCode).toBe(422);
            });
        });

        describe('PUT - Send a request to /user/:wallet', () => {
            it('Should response with a 403 status code', async () => {
                const walletInvalid = '0xinvalidWallet';
                const response = await app.inject({
                    method: 'PUT',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    payload: {
                        name: 'update-name',
                        picture: null,
                        email: 'update-email@email.com',
                    },
                    path: `/user/${walletInvalid}`,
                });
                expect(response.statusCode).toBe(403);
            });
        });

        describe('PATCH - Send a request to /user/:wallet', () => {
            it('Should response with a 200 status code and update a user wallet recorded on db', async () => {
                const newWallet = `0xupdatedWallet${Math.floor(
                    Math.random() * 11100000,
                )}`;
                const response = await app.inject({
                    method: 'PATCH',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    payload: {
                        newWallet,
                    },
                    path: `/user/${walletTest}`,
                });
                walletTest = newWallet;
                expect(response.statusCode).toBe(200);
            });
        });

        describe('PATCH - Send a request to /user/:wallet', () => {
            it('Should response with a 403 status code', async () => {
                const walletInvalid = '0xinvalidWallet';
                const response = await app.inject({
                    method: 'PATCH',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    payload: {
                        newWallet: '0xupdatedWallet',
                    },
                    path: `/user/${walletInvalid}`,
                });

                expect(response.statusCode).toBe(403);
            });
        });

        describe('PUT - Send a request to /user/:wallet/settings', () => {
            it('Should response with a 200 status code', async () => {
                const response = await app.inject({
                    method: 'PUT',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    payload: {
                        settings: { test: 'test-test-test-loud' },
                    },
                    path: `/user/${walletTest}/settings`,
                });
                expect(response.statusCode).toBe(200);
            });
        });

        describe('PUT - Send a request to /user/:wallet/settings', () => {
            it('Should response with a 422 status code and update a user settings recorded on db', async () => {
                const walletInvalid = '0xinvalidWallet';
                const response = await app.inject({
                    method: 'PUT',
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                    payload: {
                        settings: {} as IUserSettings,
                    },
                    path: `/user/${walletInvalid}/settings`,
                });
                expect(response.statusCode).toBe(422);
            });
        });
    });

    describe('GET - Send a request to /user/recent-activity', () => {
        it('Should response with a 200 status code and get user recent-activity', async () => {
            const response = await app.inject({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                path: `/user/recent-activity?pageLimit=0`,
            });
            expect(response.statusCode).toBe(200);
        });
    });

    describe('GET - Send a request to /user/recent-activity', () => {
        it('Should response with a 422 status code and get user recent-activity', async () => {
            const response = await app.inject({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${fakeJwt}`,
                },
                path: `/user/recent-activity?pageLimit=0`,
            });
            expect(response.statusCode).toBe(422);
        });
    });

    describe('GET - Send a request to /user/recent-activity', () => {
        it('Should response with a 422 status code and get user recent-activity', async () => {
            const response = await app.inject({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                path: `/user/recent-activity`,
            });
            expect(response.statusCode).toBe(422);
        });
    });

    describe('DELETE - Send a request to /user/:wallet', () => {
        it('Should response with a 200 status code and destroy a user record on db', async () => {
            const response = await app.inject({
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                path: `/user/${walletTest}`,
            });
            expect(response.statusCode).toBe(200);
        });
    });

    describe('DELETE - Send a request to /user/:wallet', () => {
        it('Should response with a 403 status code ', async () => {
            const response = await app.inject({
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${fakeJwt}`,
                },
                path: `/user/${walletTest}`,
            });
            expect(response.statusCode).toBe(403);
        });
    });

    describe('DELETE - Send a request to /user/:wallet', () => {
        it('Should response with a 403 status', async () => {
            const walletInvalid = '0xinvalidWallet';
            const response = await app.inject({
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                path: `/user/${walletInvalid}`,
            });
            expect(response.statusCode).toBe(403);
        });
    });

    describe('GET - Send a request to /user/overview', () => {
        it('Should response with a 200 status code and a user overview', async () => {
            const response = await app.inject({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                path: '/user/overview',
            });
            expect(response.statusCode).toBe(200);
        });
    });

    describe('GET - Send a request to /user/overview', () => {
        it('Should response with a 422 status code', async () => {
            const response = await app.inject({
                method: 'GET',
                headers: {
                    authorization: `Bearer ${fakeJwt}`,
                },
                path: '/user/overview',
            });
            expect(response.statusCode).toBe(422);
        });
    });
});
