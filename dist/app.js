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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const manage_servers_1 = __importDefault(require("./manage_servers/manage_servers"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const GameServer_1 = require("./interfaces/GameServer");
const GameMod_1 = require("./interfaces/GameMod");
const server = (0, fastify_1.default)({
    logger: true,
    ajv: {
        plugins: [
        //require('ajv-merge-patch')
        ]
    }
});
// TODO: put this elsewhere
server.addSchema(GameMod_1.GameModSchema);
server.addSchema(GameServer_1.GameServerFullSchema);
server.addSchema(GameServer_1.PrivateGameServerPublicPropsSchema);
server.addSchema(GameServer_1.GameServerProvidedAuthInfoSchema);
//ENDTODO
server.register(fastify_swagger_1.default, {
    exposeRoute: true,
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'r5net',
            version: '1.0'
        }
    }
});
server.register(manage_servers_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen(process.env.PORT || 3000);
        const address = server.server.address();
        const port = typeof address === 'string' ? address : address === null || address === void 0 ? void 0 : address.port;
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
//# sourceMappingURL=app.js.map