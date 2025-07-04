import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUser } from './DTO/user.dto';
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async signUp(newuser: CreateUser) {
        return await this.prisma.user.create({
            data: {
                name: newuser.name,
                email: newuser.email,
                password: newuser.password
            }
        })
    }
    async findUserWithId(userId: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
            if (!user) {
                throw new NotFoundException("User not found")
            }
            return user
        } catch (error) {
            throw new Error(`Failed to find user: ${error.message}`);
        }
    }
    async findUserWithEmail(email: string) {
        try {
            const user = this.prisma.user.findUnique({
                where: { email: email }
            })
            if (!user) {
                throw new NotFoundException("User not found")
            }
            return user
        } catch (error) {
            throw new Error(`Failed to find user: ${error.message}`);
        }
    }
    async updateUserProfile(userId: string, picture: string, bio: string) {

    }
    async getUser(userId: string) {
        try {
            const existuser = await this.findUserWithId(userId)
            const { password, ...user } = existuser
            return user
        } catch (error) {
            throw new UnauthorizedException("Unauthorized")
        }
    }
    async deleteUser(userId: string) {
        try {
            const user = await this.findUserWithId(userId)
            if (!user) {
                throw new NotFoundException('User not found');
            }
            await this.prisma.user.delete({ where: { id: userId } })
            return { message: 'User deleted successfully' };
        } catch (error) {

        }
    }
}
