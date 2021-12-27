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
                ipAddress: { type: 'string', nullable: true }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    isBanned: { type: 'boolean' }
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
        const ipAddress = (req.body as any).ipAddress;

        try {
            const isBanned = await IsUserBanned(oid, ipAddress);
            res.send({ isBanned });
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
                isBanned: { type: 'boolean' },
                oid: { type: 'number', nullable: true },
                ipAddress: { type: 'string', nullable: true },
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
        const isBanned = (req.body as any).isBanned;
        const oid = (req.body as any).oid;
        const ipAddress = (req.body as any).ipAddress;
        const password = (req.body as any).password;

        if(password !== process.env.ADMIN_PASSWORD) {
            res.status(403).send({ error: 'Invalid password.' });
            return;
        }

        try {
            const hadEffect = await UpdateUserBanStatus(isBanned, oid, ipAddress);
            res.send({ hadEffect });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }
};