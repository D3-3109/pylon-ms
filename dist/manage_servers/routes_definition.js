"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGameServerRoute = exports.GetGameServersListRoute = void 0;
const game_servers_1 = require("../state/game_servers");
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
        }
    },
    handler: (req, res) => {
    }
};
//# sourceMappingURL=routes_definition.js.map