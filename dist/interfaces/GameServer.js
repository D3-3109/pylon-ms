"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeGameServerID = exports.GetGameServerID = exports.GameServerProvidedAuthInfoSchema = exports.PrivateGameServerPublicPropsSchema = exports.GameServerFullSchema = void 0;
exports.GameServerFullSchema = {
    $id: 'GameServerFullSchema',
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        password: { type: 'string', nullable: true },
        playerCount: { type: 'number' },
        maxPlayerCount: { type: 'number' },
        playlist: { type: 'string' },
        mapName: { type: 'string' },
        mods: {
            type: 'array',
            items: { $ref: 'GameModSchema' }
        },
        ipAddress: { type: 'string' },
        gamePort: { type: 'number' },
        encryptionKey: { type: 'string' },
    }
};
exports.PrivateGameServerPublicPropsSchema = {
    $id: 'PrivateGameServerPublicPropsSchema',
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' }
    }
};
exports.GameServerProvidedAuthInfoSchema = {
    $id: 'GameServerProvidedAuthInfoSchema',
    type: 'object',
    properties: {
        gamePort: { type: 'number' },
        encryptionKey: { type: 'string' },
    }
};
function GetGameServerID(gameServer) {
    if (gameServer.cachedID)
        return gameServer.cachedID;
    gameServer.cachedID = MakeGameServerID(gameServer.ipAddress, gameServer.gamePort, gameServer.encryptionKey);
    return gameServer.cachedID;
}
exports.GetGameServerID = GetGameServerID;
function MakeGameServerID(ipAddress, gamePort, encryptionKey) {
    return ipAddress + ":" + gamePort + ":" + encryptionKey;
}
exports.MakeGameServerID = MakeGameServerID;
//# sourceMappingURL=GameServer.js.map