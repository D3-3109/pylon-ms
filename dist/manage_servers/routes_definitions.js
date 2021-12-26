"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGameServerRoute = exports.GetGameServersListRoute = void 0;
const game_servers_1 = require("../state/game_servers");
const server_connect_check_1 = require("./server_connect_check");
exports.GetGameServersListRoute = {
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
            publicServers: (0, game_servers_1.GetPublicGameServers)(),
            privateServers: (0, game_servers_1.GetPrivateGameServers)()
        });
    }
};
exports.UpdateGameServerRoute = {
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
    handler: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const gameServer = (req.body.gameServer);
        gameServer.ipAddress = req.ip;
        const { ipAddress, gamePort, encryptionKey } = gameServer;
        try {
            yield (0, server_connect_check_1.CheckGameServerConnection)(ipAddress, gamePort, encryptionKey);
        }
        catch (e) {
            res.status(403).send({ error: 'Game server connection check failed.' });
            return;
        }
        const success = (0, game_servers_1.UpdateGameServerByID)(gameServer);
        if (success) {
            res.status(200).send({});
            return;
        }
        else {
            res.status(500).send({ error: 'Something went wrong on our side.. Please contact R5R developers.' });
            return;
        }
    })
};
//# sourceMappingURL=routes_definitions.js.map