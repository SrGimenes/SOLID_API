/* eslint-disable prettier/prettier */
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            is_validated: data.is_validated ? new Date(data.is_validated) : null,
            created_at: new Date(),
        }

        this.items.push(checkIn)

        return checkIn
    }
}
