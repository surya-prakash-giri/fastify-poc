import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { getUsers, getUser, addUser, removeUser, updateUser } from "./userControllers.js"
import User from "./userModel.js"

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User
      }
    }
  },
  handler: getUsers
}

const getUserOpts = {
  schema: {
    response: {
      200: User
    }
  },
  handler: getUser
}

async function userRoutes(fastify: FastifyInstance, options: Object) {
  // GET all users
  fastify.get('/users', getUsersOpts)

  // GET specific User
  fastify.get('/users/:id', getUserOpts)

  // Add User
  fastify.post('/users', addUser)

  // Remove User
  fastify.delete('/users/:id', removeUser)

  // Update User
  fastify.put('/users/:id', updateUser)
}

export default userRoutes;