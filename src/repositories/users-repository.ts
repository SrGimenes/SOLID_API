/* eslint-disable prettier/prettier */
import { Prisma, User } from "@prisma/client";

export default interface UsersRepository {
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
}