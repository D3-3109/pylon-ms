import fastify, { FastifyInstance } from "fastify";
import { GetGameServersListRoute, UpdateGameServerRoute } from "./routes_definitions";

async function routes(server: FastifyInstance, options: any) {
    server.route(GetGameServersListRoute);
    server.route(UpdateGameServerRoute);
}
  
export default routes;