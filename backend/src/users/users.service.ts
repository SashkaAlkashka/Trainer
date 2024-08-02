import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
@Injectable()
export class UserService{
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>){}

    async createUser(dto: CreateUserDto){
        const user = await this.userRepository.create();
        user.login = dto.login;
        user.password = dto.password;
        await this.userRepository.save(user);
        return user;
    }
    async getAllUsers(){
        const users = await this.userRepository.find();
        return users;
    }
    async getUserByLogin(login: string){
        const user = await this.userRepository.findOne({where: {login}});
        return user;
    }

}