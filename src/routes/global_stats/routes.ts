import { RouteOptions } from "fastify";
import { GetAllGameServers, GetPublicGameServers } from "../../state/game_servers";

export const GetGlobalStatsRoute: RouteOptions = {
    method: 'GET',
    url: '/api/stats',
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {   
                    noPlayers: { type: 'number' },
                    noServers: { type: 'number' },
                }
            },
            500: {
                type: 'object',
                properties: { error: { type: 'string' } }
            }
        }
    },
    handler: (req, res) => {
        res.send({
            noPlayers: (() => {
                return GetAllGameServers().map(gs => gs.playerCount).reduce((cnt, cur) => cur + cnt, 0);
            })(),
            noServers: (() => {
                return GetAllGameServers().length;
            })()

        });
    }
};