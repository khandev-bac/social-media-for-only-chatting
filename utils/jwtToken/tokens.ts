import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
interface Tokens {
    accessToken: string;
    refreshToken: string;
}
interface Payload {
    user_id: string;
    name: string;
    email: string;
}
@Injectable()
export class JwtServiceUtils {
    constructor(private jwt: JwtService) { }
    signToken(payload: Payload): Tokens {
        const accessToken = this.jwt.sign(payload, { secret: process.env.ACCESS_SCRECT, expiresIn: "15m" })
        const refreshToken = this.jwt.sign(payload, { secret: process.env.REFRESH_SERECT, expiresIn: "90d" })
        return {
            accessToken,
            refreshToken
        }
    }
    verifyAccessToken(token: string): Payload {
        return this.jwt.verify(token, { secret: process.env.ACCESS_SCRECT })
    }
    verifyRefreshToken(token: string): Payload {
        return this.jwt.verify(token, { secret: process.env.REFRESH_SERECT })
    }
}