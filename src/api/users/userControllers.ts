import { FastifyReply, FastifyRequest } from "fastify";
import { deleteUser, getAllUsers, getSingleUser, insertUser, updateUserQry } from "./user-sql.js";
import { fastify } from '../../cmd/server.js';

const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const response = await fastify.pg.query(getAllUsers)
        reply.send(response.rows);
    } catch (error) {
        fastify.log.error(error)
    }
}

const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = <{ id: string }>request.params;

        const response = await fastify.pg.query(getSingleUser, [id])
        if (!response.rows.length) {
            reply.send({ message: `No user found with the userId: ${id}`});
            return;
        }
        reply.send(response.rows[0]);
    } catch (error) {
        fastify.log.error(error)
    }
}

const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { name, email, age, gender } = <{ name: string, email: string, age: number, gender: string }>request.body;
        const response = await fastify.pg.query(insertUser, [name, email, age, gender])
        reply.code(201).send({ message: "User Added successfully", result: response });
    } catch (error) {
        fastify.log.error(error)
    }
}

const removeUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = <{ id: string }>request.params;
        const result = await fastify.pg.query(getSingleUser, [id])
        if (!result.rows.length) {
            reply.send({ message: "No user found with the userId: ", id });
            return;
        }
        const response = await fastify.pg.query(deleteUser, [id])
        reply.send({ message: "User Deleted successfully", result: response });
    } catch (error) {
        fastify.log.error(error)
    }
}

const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = <{ id: string }>request.params;
        const result = await fastify.pg.query(getSingleUser, [id])
        if (!result.rows.length) {
            reply.send({ message: "No user found with the userId: ", id });
            return;
        }
        const body: any = request.body;
        const updateObj = Object.entries(body).map(([key, value]) => typeof value === 'string' ? `${key}="${value}"` : `${key}=${value}`).join(',')
        const response = await fastify.pg.query(updateUserQry, [updateObj, id])
        reply.send({ message: "User Updated successfully", result: response });
    } catch (error) {
        fastify.log.error(error)
    }
}

export { getUsers, getUser, addUser, removeUser, updateUser }