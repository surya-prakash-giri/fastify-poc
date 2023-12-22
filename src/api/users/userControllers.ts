import { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from 'uuid';
import { deleteUser, getAllUsers, getSingleUser, insertUser } from "./user-sql.js";
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

        const response = await fastify.pg.query(deleteUser, [id])
        reply.send({ message: "User Deleted successfully", result: response });
    } catch (error) {
        fastify.log.error(error)
    }
}

export { getUsers, getUser, addUser, removeUser }