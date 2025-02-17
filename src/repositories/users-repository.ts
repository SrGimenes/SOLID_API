/* eslint-disable prettier/prettier */
import { Prisma, User } from "@prisma/client";

export default interface UsersRepository {
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
}