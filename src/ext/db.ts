import fastifyPlugin from 'fastify-plugin'
import pg from '@fastify/postgres'
import { FastifyInstance } from 'fastify'

const connectToDB = async (fastify: FastifyInstance, options: Object) => {
    fastify.register(pg, {
        connectionString: 'postgres://postgres:Surya@321@localhost:5432/poc'
    })
}

export default fastifyPlugin(connectToDB)