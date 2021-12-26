import { RouteOptions } from "fastify/types/route";
import { GameServer, MakeGameServerID } from "../interfaces/GameServer";
import { GetPrivateGameServers, GetPublicGameServers, UpdateGameServerByID } from "../state/game_servers";
import { CheckGameServerConnection } from "./server_connect_check";


export const GetGameServersListRoute: RouteOptions = {
    method: 'GET',
    url: '/api/game_servers/list',
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    publicServers: {
                        type: 'array',
                        items: {
                            $ref: 'GameServerFullSchema'
                        }
                    },
                    privateServers: {
                        type: 'array',
                        items: {
                            $ref: 'PrivateGameServerPublicPropsSchema'
                        }
                    }
                }
            }
        }
    },
    handler: (req, res) => {
        res.send({
            publicServers: GetPublicGameServers(),
            privateServers: GetPrivateGameServers()
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
        gameServer.ipAddress = req.ip;
        
        const { ipAddress, gamePort, encryptionKey } = gameServer;

        try {
            await CheckGameServerConnection(ipAddress, gamePort, encryptionKey);
        } catch(e) {
            res.status(403).send({error: 'Game server connection check failed.'});
            return;
        }

        const success = UpdateGameServerByID(gameServer);
        if(success) {
            res.status(200).send({});
            return;
        } else {
            res.status(500).send({error: 'Something went wrong on our side.. Please contact R5R developers.'});
            return;
        }
    }
}