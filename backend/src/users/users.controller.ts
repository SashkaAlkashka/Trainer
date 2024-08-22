
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesAuthGuard } from "src/auth/roles-auth.guard";

@ApiTags('Пользователи')
@Controller('/users')
export class UsersController{
    constructor(private usersService: UserService){}
    /*
    @ApiOperation({ summary: 'Создание пользователя' }) 
    @Post('/user')
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto);
    }
    @ApiOperation({ summary: 'Создание гостя' }) 
    @Post('/guest')
    createGuest(){
        return this.usersService.createGuest();
    }
        */
    @ApiOperation({ summary: 'Вывод всех пользователей' }) 
    //@UseGuards(JwtAuthGuard)  // Используем Guard для защиты маршрута
    @Roles('user')
    @UseGuards(RolesAuthGuard)
    @ApiBearerAuth('access-token')  // Указываем, что эндпоинт требует Bearer токен
    @Get('')
    getUsers(){
        console.log('1');
        return this.usersService.getAllUsers();
    }
    

}