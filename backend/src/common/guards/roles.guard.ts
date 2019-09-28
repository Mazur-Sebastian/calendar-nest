import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        //This any is because the jwt.verify type (string | object) is not compatible with what jwt returns
        const decode: any = jwt.verify(
            token.split(' ')[1],
            process.env.SECRET_KEY,
        );

        return decode && decode.isAdmin;
    }
}
