import fastify, { FastifyInstance } from "fastify"

async function baseRoute(fastify: FastifyInstance, options: Object) {
    fastify.get('/', async (request, reply) => {
      reply.send({
        message: "Hello, World!"
      })
    })
}

export default baseRoute;