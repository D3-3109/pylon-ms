import fastify, { FastifyInstance } from "fastify";
import { GetGameServersListRoute, GetPrivateServerInfo, UpdateGameServerRoute } from "./routes";

async function routes(server: FastifyInstance, options: any) {
    server.route(GetGameServersListRoute);
    server.route(UpdateGameServerRoute);
    server.route(GetPrivateServerInfo);
}
  
export default routes;