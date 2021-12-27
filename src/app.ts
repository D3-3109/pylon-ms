import Fastify, { fastify, FastifyInstance, RouteShorthandOptions } from 'fastify'
import ServerManagement from './manage_servers/manage_servers';
import fastifySwagger from 'fastify-swagger';
import { GameServerProvidedAuthInfoSchema, PrivateGameServerPublicPropsSchema, GameServerFullSchema } from './interfaces/game_server';
import { GameModSchema } from './interfaces/game_mod';
import { RunGameServersListCleanJob } from './state/game_servers';



const server: FastifyInstance = Fastify({
  logger: true, 
  ajv: {
    plugins: [ 
      //require('ajv-merge-patch')
    ]
  }
});



// TODO: put this elsewhere
server.addSchema(GameModSchema);
server.addSchema(GameServerFullSchema);
server.addSchema(PrivateGameServerPublicPropsSchema);
server.addSchema(GameServerProvidedAuthInfoSchema);
//ENDTODO




server.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'r5net',
      version: '1.0'
    }
  }
});


server.register(ServerManagement);


const start = async () => {
    try {
      await server.listen(process.env.PORT || 3000)
  
      const address = server.server.address()
      const port = typeof address === 'string' ? address : address?.port
  
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }
start()

setInterval(() => {
  RunGameServersListCleanJob();
}, 10000);
