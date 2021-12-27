import { FastifyInstance } from "fastify";
import { GetGlobalStatsRoute } from "./routes";

async function routes(server: FastifyInstance, options: any) {
    server.route(GetGlobalStatsRoute);
}

export default routes;