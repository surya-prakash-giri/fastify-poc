import Fastify from 'fastify'
import 'dotenv/config'

import userRoutes from '../api/users/usersRoutes.js'
import baseRoute from '../api/core/base.js'
import db from '../ext/db.js'

const fastify = Fastify({
  logger: true
})
const PORT = 3000

// register db
fastify.register(db);

// routes
fastify.register(baseRoute)
fastify.register(userRoutes)

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: PORT })
    fastify.log.info(`server listening on ${PORT}`)
    //connect to db
    const connection = await fastify.pg.connect();
    fastify.log.info(`DB connected ${JSON.stringify(connection.connectionParameters)}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
export {fastify}