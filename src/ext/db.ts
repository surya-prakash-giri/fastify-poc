import fastifyPlugin from 'fastify-plugin'
import pg from '@fastify/postgres'
import { FastifyInstance } from 'fastify'
import config from 'config';

const DB_NAME: string = config.get('db.name');
const HOST: string = config.get('db.host');
const USER: string = config.get('db.user');
const PORT: number = config.get('db.port');
const connectionString = `postgres://${USER}:${process.env.DB_PASS}@${HOST}:${PORT}/${DB_NAME}`

const connectToDB = async (fastify: FastifyInstance, options: Object) => {
    fastify.register(pg, { connectionString })
}

export default fastifyPlugin(connectToDB)