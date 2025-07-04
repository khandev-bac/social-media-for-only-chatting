import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtServiceUtils } from 'utils/jwtToken/tokens';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtservice: JwtServiceUtils) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const authHeader = request.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token missing');
      }
      const token = authHeader.split(' ')[1]
      const decode = this.jwtservice.verifyAccessToken(token)
      request.user = decode
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
