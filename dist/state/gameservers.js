"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServerByID = exports.FindAndDeleteServerByID = exports.FindServerByID = void 0;
const GameServer_1 = require("../interfaces/GameServer");
let gameServers = {};
function FindServerByID(ID) {
    return gameServers[ID];
}
exports.FindServerByID = FindServerByID;
function FindAndDeleteServerByID(ID) {
    if (gameServers[ID]) {
        delete gameServers[ID];
        return true;
    }
    return false;
}
exports.FindAndDeleteServerByID = FindAndDeleteServerByID;
function UpdateServerByID(ID, newInfo) {
    if (gameServers[ID]) {
        if (newInfo) {
            // we make sure the server's identity hasnt changed
            if ((0, GameServer_1.GetServerID)(gameServers[ID]) == (0, GameServer_1.GetServerID)(newInfo)) {
                gameServers[ID] = newInfo;
                gameServers[ID].lastHeartbeat = Date.now();
                return true;
            }
        }
        else {
            gameServers[ID].lastHeartbeat = Date.now();
            return true;
        }
    }
    return false;
}
exports.UpdateServerByID = UpdateServerByID;
//# sourceMappingURL=gameservers.js.map