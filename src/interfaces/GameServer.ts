import bcrypt from "bcrypt";
import { GameMod } from './GameMod';

export interface GameServer {
    name: string,
    description: string,
    password?: string,


    playerCount: number,
    maxPlayerCount: number,
    playlist: string,
    mapName: string,
    
    mods: GameMod[],

    ipAddress: string,
    gamePort: number,
    encryptionKey: string,
    remoteChecksum: string,
    

    reloadedVersion: string,

    lastHeartbeat: number,

    // do not use this property directly!! it's better to use GetServerID(this server)
    cachedID?: string
}

export const GameServerFullSchema = {
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

export const PrivateGameServerPublicPropsSchema = {
    $id: 'PrivateGameServerPublicPropsSchema',
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' }
    }
}

export const GameServerProvidedAuthInfoSchema = {
    $id: 'GameServerProvidedAuthInfoSchema',
    type: 'object',
    properties: {
        gamePort: { type: 'number' },
        encryptionKey: { type: 'string' },
    }
}

export function GetGameServerID(gameServer: GameServer): string {
    if(gameServer.cachedID) return gameServer.cachedID;


    gameServer.cachedID = MakeGameServerID(gameServer.ipAddress, gameServer.gamePort, gameServer.encryptionKey);
    return gameServer.cachedID;
}

export function MakeGameServerID(ipAddress: string, gamePort: number, encryptionKey: string) {
    return ipAddress + ":" + gamePort + ":" + encryptionKey;
}
