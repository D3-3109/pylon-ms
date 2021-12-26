import  { GameServer, GetGameServerID } from '../interfaces/GameServer';


let gameServers: { [id: string]: GameServer} = {};

export function GetPublicGameServers() {
    return Object.values(gameServers).filter(gs => !gs.password);
}

export function GetPrivateGameServers() {
    return Object.values(gameServers).filter(gs => gs.password);
}

export function FindGameServerByID(ID: string): GameServer {
    return gameServers[ID];
}

export function FindAndDeleteGameServerByID(ID: string): boolean {
    if(gameServers[ID]) {
        delete gameServers[ID];
        return true;
    }

    return false;
}

export function UpdateGameServerByID(newInfo: GameServer) {
    // safety net in case something happens and the actual server identity doesnt match with dictionary ID
    const ID = GetGameServerID(newInfo);

    gameServers[ID] = {...gameServers[ID], ...newInfo};
    gameServers[ID].lastHeartbeat = Date.now();
    return true;
}
