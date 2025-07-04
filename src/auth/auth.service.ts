import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { hashedPassword, verifyPassword } from 'utils/argon/argon';
import { CreateUser, LoginUser } from './DTO/auth.dto';
import { JwtServiceUtils } from 'utils/jwtToken/tokens';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtservice: JwtServiceUtils
    ) { }
    async signUp(newUser: CreateUser) {
        try {
            const existingUser = await this.userService.findUserWithEmail(newUser.email)
            if (existingUser) {
                throw new ConflictException("User already present try to login")
            }
            const hashed = await hashedPassword(newUser.password)
            const newuser = await this.userService.signUp({ name: newUser.name, email: newUser.email, password: hashed })
            const tokens = this.jwtservice.signToken({ user_id: newuser.id, email: newuser.email, name: newuser.name })
            const { password, ...user } = newuser
            return {
                message: "User Created Successfully",
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                user
            }
        } catch (error) {
            console.log("Error while sigup ", error)
            throw new InternalServerErrorException("Error while signup")
        }
    }
    async login(loginUser: LoginUser) {
        try {
            const existingUser = await this.userService.findUserWithEmail(loginUser.email)
            if (!existingUser) {
                throw new NotFoundException("User not found")
            }
            const isPasswordValid = await verifyPassword(existingUser.password, loginUser.password)
            if (!isPasswordValid) {
                throw new UnauthorizedException("User password or email field are inncorrect")
            }
            const tokens = this.jwtservice.signToken({ user_id: existingUser.id, email: existingUser.email, name: existingUser.name })
            return {
                mesage: "Login is successfull",
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        } catch (error) {
            console.log("Error while login ", error)
            throw new InternalServerErrorException("Error while login")
        }
    }
    // async delete(user)
    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token missing');
        }
        try {
            const decode = this.jwtservice.verifyRefreshToken(refreshToken)
            const token = this.jwtservice.signToken({ user_id: decode.user_id, email: decode.email, name: decode.name })
            return {
                message: "Token is refreshed",
                accessToken: token.accessToken
            }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Refresh token expired');
            }
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
