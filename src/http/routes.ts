/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { register } from './Controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
