import { FastifyInstance } from "fastify";
import { GetIsUserBannedRoute, UpdateUserBanStatusRoute } from "./routes";

async function routes(server: FastifyInstance, options: any) {
    server.route(GetIsUserBannedRoute);
    server.route(UpdateUserBanStatusRoute);
}

export default routes;
