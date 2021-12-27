import fastify, { FastifyInstance } from "fastify";
import { GetGameServersListRoute, GetPrivateServerInfo as GetPrivateServerInfoRoute, UpdateGameServerRoute } from "./routes";

async function routes(server: FastifyInstance, options: any) {
    server.route(GetGameServersListRoute);
    server.route(UpdateGameServerRoute);
    server.route(GetPrivateServerInfoRoute);
}
  
export default routes;