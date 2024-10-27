
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "src/users/dto/create-user.dto";
import { UserService } from "src/users/users.service";
import { User } from "src/users/user.entity";
import { GroupClassService } from "src/group_class/group_class.service";
@Injectable()
export class SettingService{
    constructor(private userService: UserService,
                private classService: GroupClassService
    ){}

    
    async updateUser(userDto: UpdateUserDto): Promise<User> {
        const user = await this.userService.getUserByLogin(userDto.login);
        if (!user) {
            throw new UnauthorizedException({message: 'Пользователь не найден'})
        }
        user.name = userDto.name;  
        const classId = this.classService.findClassByName(userDto.class);
        user.class_id = (await classId).id; 
        return this.userService.saveUser(user); 
    }
    

    

}