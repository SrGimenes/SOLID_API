/* eslint-disable prettier/prettier */
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'


let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })


    it('should be able to get user profile', async () => {


        //Pattern system under test

        //Cadastrando o usuário
        const createdUser = await usersRepository.create({
            name: 'Gabriel Gimenes',
            email: 'gabriel.alencar@gmail.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual("Gabriel Gimenes")
    })
    it('should not be able to to get user profile with wrong id', async () => {
        //Pattern system under test

        expect(() => sut.execute({
            userId: 'non-existing-id'
        })).rejects.toBeInstanceOf(ResourceNotFoundError)

    })
})
