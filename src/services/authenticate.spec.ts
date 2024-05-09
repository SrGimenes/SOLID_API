/* eslint-disable prettier/prettier */
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Register Use Case', () => {
    it('should be able to authenticate', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        //Pattern system under test

        //Cadastrando o usuário
        await usersRepository.create({
            name: 'Gabriel Gimenes',
            email: 'gabriel.alencar@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'gabriel.alencar@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })
    it('should not be able to authenticate with wrong email', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        //Pattern system under test

        await usersRepository.create({
            name: 'Gabriel Gimenes',
            email: 'gabriel.alencar@gmail.com',
            password_hash: await hash('123456', 6)
        })

        expect(() => sut.execute({
            email: 'gabriel.alencar@gmail.com',
            password: '123321'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })
})
