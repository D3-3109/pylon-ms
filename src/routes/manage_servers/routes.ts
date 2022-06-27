import { RouteOptions } from "fastify/types/route";
import { GameServer } from "../../interfaces/game_server";
import { FindGameServerByPublicRef, GetPrivateGameServers, GetPublicGameServers, UpdateGameServerByID } from "../../state/game_servers";
import { CheckGameServerConnection } from "./server_connect_check";


export const GetGameServersListRoute: RouteOptions = {
    method: 'GET',
    url: '/api/game_servers/list',
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    servers: {
                        type: 'array',
                        items: {
                            $ref: 'GameServerFullSchema'
                        }
                    },
                    success: { type: 'boolean' }
                }
            }
        }
    },
    handler: (req, res) => {
        res.send({
            servers: GetPublicGameServers(),
            success: true // FIXME: Add SDK version check.
        });
    }
};

export const UpdateGameServerRoute: RouteOptions = {
    method: 'POST',
    url: '/api/game_servers/update',
    schema: {
        body: {
            type: 'object',
            properties: {
                gameServer: {
                    $ref: 'GameServerFullSchema'
                }
            }
        },
        response: {
            200: {
                type: 'object'
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
        const gameServer = ((req.body as any).gameServer) as GameServer;
        gameServer.ip = req.ip;
        
        const { ip, port, key } = gameServer;

        try {
            const succeededPinging = await CheckGameServerConnection(ip, port, key);
            if(!succeededPinging) {
                res.status(403).send({error: 'Game server connection check failed.'});
                return;
            }
        } catch(e) {
            res.status(500).send({error: 'Something wrong happened while attempting to connect to the game server. Please contact the R5Reloaded developers.'});
            return;
        }

        UpdateGameServerByID(gameServer);
        res.status(200).send({});
    }
};

export const GetPrivateServerInfo: RouteOptions = {
    method: 'POST',
    url: '/api/game_servers/game_server_private_info',
    schema: {
        body: {
            type: 'object',
            properties: {
                publicRef: { type: 'string' },
                password: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    gameServer: {
                        $ref: 'GameServerFullSchema'
                    }
                }
            },
            403: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            },
            404: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            }
        }
    },
    handler: (req, res) => {
        const { publicRef, password } = req.body as any;
        const gameServer = FindGameServerByPublicRef(publicRef);
        if(!gameServer) {
            res.status(404).send({error: 'Game server not found.'});
            return;
        }
        if(gameServer.password !== password) {
            res.status(403).send({error: 'Wrong password.'});
            return;
        }
        res.send({gameServer});
    }
};