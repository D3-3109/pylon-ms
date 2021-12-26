"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGameServerByID = exports.FindAndDeleteGameServerByID = exports.FindGameServerByID = exports.GetPrivateGameServers = exports.GetPublicGameServers = void 0;
const GameServer_1 = require("../interfaces/GameServer");
let gameServers = {};
function GetPublicGameServers() {
    return Object.values(gameServers).filter(gs => !gs.password);
}
exports.GetPublicGameServers = GetPublicGameServers;
function GetPrivateGameServers() {
    return Object.values(gameServers).filter(gs => gs.password);
}
exports.GetPrivateGameServers = GetPrivateGameServers;
function FindGameServerByID(ID) {
    return gameServers[ID];
}
exports.FindGameServerByID = FindGameServerByID;
function FindAndDeleteGameServerByID(ID) {
    if (gameServers[ID]) {
        delete gameServers[ID];
        return true;
    }
    return false;
}
exports.FindAndDeleteGameServerByID = FindAndDeleteGameServerByID;
function UpdateGameServerByID(newInfo) {
    // safety net in case something happens and the actual server identity doesnt match with dictionary ID
    const ID = (0, GameServer_1.GetGameServerID)(newInfo);
    gameServers[ID] = Object.assign(Object.assign({}, gameServers[ID]), newInfo);
    gameServers[ID].lastHeartbeat = Date.now();
    return true;
}
exports.UpdateGameServerByID = UpdateGameServerByID;
//# sourceMappingURL=game_servers.js.map