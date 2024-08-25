import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()   
export class RolesAuthGuard implements CanActivate{
    constructor(private jwtSevice:JwtService,
        private reflector: Reflector
    ){

    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try{
            
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles){
                return true;
            }
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if (bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Пользователь не авторизован B'})
            }
            const user=this.jwtSevice.verify(token);
            req.user = user;
            const hasRole = requiredRoles.includes(user.role);
            return hasRole;

        }   catch(e){
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
        }

    }
}