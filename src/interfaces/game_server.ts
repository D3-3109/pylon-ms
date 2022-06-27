import bcrypt from "bcrypt";
import { GameMod } from './game_mod';

export interface GameServer {
    name: string,
    description: string,

    password?: string,
    hidden: boolean,

    map: string,
    playlist: string,
    
    mods: GameMod[],

    ip: string,
    port: number,
    key: string,

    checksum: string,
    version: string,

    playerCount: number,
    maxPlayers: number,
    lastHeartbeat: number,
    
    publicRef?: string

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
        maxPlayers: { type: 'number' },
        playlist: { type: 'string' },
        map: { type: 'string' },
        mods: { 
            type: 'array',
            items: { $ref: 'GameModSchema' }
        },
        ip: { type: 'string' },
        port: { type: 'number' },
        key: { type: 'string' },
    }
};

export const PrivateGameServerPublicPropsSchema = {
    $id: 'PrivateGameServerPublicPropsSchema',
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        publicRef: { type: 'string' }
    }
}

export const GameServerProvidedAuthInfoSchema = {
    $id: 'GameServerProvidedAuthInfoSchema',
    type: 'object',
    properties: {
        port: { type: 'number' },
        key: { type: 'string' },
    }
}

export function GetGameServerID(gameServer: GameServer): string {
    if(gameServer.cachedID) return gameServer.cachedID;


    gameServer.cachedID = MakeGameServerID(gameServer.ip, gameServer.port, gameServer.key);
    return gameServer.cachedID;
}

export function MakeGameServerID(ip: string, port: number, key: string) {
    return ip + ":" + port + ":" + key;
}
