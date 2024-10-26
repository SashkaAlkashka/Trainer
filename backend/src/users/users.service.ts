import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { GroupClassService } from "src/group_class/group_class.service";
@Injectable()
export class UserService{
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly groupClassService: GroupClassService
){}

    async createUser(dto: CreateUserDto){
        const user = await this.userRepository.create();
        user.login = dto.login;
        user.password = dto.password;
        user.isActivated = false;
        user.role = 'user';
        user.name = dto.name;
        user.class_id = (await this.groupClassService.confirmExistanceOfClass(dto.class)).id
        await this.userRepository.save(user);
        return user;
    }
    async createGuest(){
        const user = await this.userRepository.create();
        user.login = null;
        user.password = null;
        user.isActivated = null;
        user.name = null;
        user.class_id = null;
        user.role = 'guest';
        await this.userRepository.save(user);
        return user;
    }
    async getAllUsers(){
        console.log('2');
        const users = await this.userRepository.find();
        return users;
    }
    async getUserByLogin(login: string){
        const user = await this.userRepository.findOne({where: {login}});
        return user;
    }
    async getUserById(id: number){
        const user = await this.userRepository.findOne({where: {id}});
        return user;
    }
    async updateUserActivation(id:number){
        const user = await this.userRepository.findOne({where: {id}});
        user.isActivated=true;
    }

}