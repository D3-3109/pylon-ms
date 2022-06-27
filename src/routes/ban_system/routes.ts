import { RouteOptions } from "fastify";
import { IsUserBanned, UpdateUserBanStatus } from "../../state/ban_system";

export const GetIsUserBannedRoute: RouteOptions = {
    method: 'POST',
    url: '/api/ban_system/is_user_banned',
    schema: {
        body: {
            type: 'object',
            properties: {
                oid: { type: 'number', nullable: true },
                ip: { type: 'string', nullable: true }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    banned: { type: 'boolean' }
                }
            },
            404: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            },
            500: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            }
        }
    },
    handler: async (req, res) => {
        const oid = (req.body as any).oid;
        const ip = (req.body as any).ip;

        try {
            const banned = await IsUserBanned(oid, ip);
            res.send({ banned });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }


    }
};

export const UpdateUserBanStatusRoute: RouteOptions = {
    method: 'POST',
    url: '/api/ban_system/update_user_ban_status',
    schema: {
        body: {
            type: 'object',
            properties: {
                banned: { type: 'boolean' },
                oid: { type: 'number', nullable: true },
                ip: { type: 'string', nullable: true },
                password: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    hadEffect: { type: 'boolean' }
                }
            },
            403: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            },
            500: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            }
        }
    },
    handler: async (req, res) => {
        const banned = (req.body as any).banned;
        const oid = (req.body as any).oid;
        const ip = (req.body as any).ip;
        const password = (req.body as any).password;

        if(password !== process.env.ADMIN_PASSWORD) {
            res.status(403).send({ error: 'Invalid password.' });
            return;
        }

        try {
            const hadEffect = await UpdateUserBanStatus(banned, oid, ip);
            res.send({ hadEffect });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }
};