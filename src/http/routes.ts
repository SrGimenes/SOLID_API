/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { register } from './Controllers/register'
import { authenticate } from './Controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
