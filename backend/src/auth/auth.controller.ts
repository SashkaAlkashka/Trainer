import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto, LoginUserDto } from "src/users/dto/create-user.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('/login')
    login(@Body() userDto: LoginUserDto){
        return this.authService.login(userDto);
    }
    @Post('/register')
    register(@Body() userDto:CreateUserDto){
        return this.authService.register(userDto);
    }
    @Post('/guest')
    guest(){
        return this.authService.guest();
    }

    @Get('/confirmation/:token')
    confirmEmail(@Body() token: string){
        return this.authService.confirm(token);
    }


}