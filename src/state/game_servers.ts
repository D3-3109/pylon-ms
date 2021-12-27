import  { GameServer, GetGameServerID } from '../interfaces/game_server';


let gameServers: { [id: string]: GameServer} = {};

export function GetPublicGameServers() {
    return Object.values(gameServers).filter(gs => !gs.password);
}

export function GetPrivateGameServers() {
    return Object.values(gameServers).filter(gs => gs.password);
}

export function GetAllGameServers() {
    return Object.values(gameServers);
}

export function FindGameServerByID(ID: string): GameServer {
    return gameServers[ID];
}

export function FindGameServerByPublicRef(ID: string) {
    return Object.values(gameServers).find(gs => gs.publicRef === ID);
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
    if(!gameServers[ID].publicRef) {
        gameServers[ID].publicRef = Buffer.from(Math.random().toString()).toString("base64").substr(10, 5);
    }
}

export function RunGameServersListCleanJob() {
    let noServersCleaned = 0;
    for(const [ID, gameServer] of Object.entries(gameServers)) {
        if(Date.now() - gameServer.lastHeartbeat > 20000) {
            delete gameServers[ID];
            noServersCleaned++;
        }
    }
    return noServersCleaned;
}
