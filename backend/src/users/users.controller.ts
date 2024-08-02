
import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Пользователи')
@Controller('/users')
export class UsersController{
    constructor(private usersService: UserService){}

    @ApiOperation({ summary: 'Создание пользователя' }) 
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto);
    }
    @ApiOperation({ summary: 'Вывод всех пользователей' }) 
    @Get('')
    getUsers(){
        return this.usersService.getAllUsers();
    }

}