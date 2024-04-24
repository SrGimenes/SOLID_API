/* eslint-disable prettier/prettier */
import fastify from 'fastify'
import { register } from './http/Controllers/register'

export const app = fastify()

app.post('/users', register)