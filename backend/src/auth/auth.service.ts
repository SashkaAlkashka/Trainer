
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UserService } from "src/users/users.service";
import * as bcrypt from 'bcryptjs';
import { User } from "src/users/user.entity";
@Injectable()
export class AuthService{
    constructor(private userService: UserService,
                private jwtService:JwtService
    ){}

    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }
    private async validateUser(userDto: CreateUserDto){
        const user = await this.userService.getUserByLogin(userDto.login);
        if (user == null){
            throw new UnauthorizedException({message: 'Не существует пользователя с таким логином'})
        }
        const passEquals = await bcrypt.compare(userDto.password, user.password);
        if(user && passEquals){
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный пароль'})
    }
    async guest(){
        const newGuest = await this.userService.createGuest();
        return this.generateToken(newGuest);
    }

    async register(userDto: CreateUserDto){
        const newUser = await this.userService.getUserByLogin(userDto.login);
        if (newUser){
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 6);
        const user = await this.userService.createUser({...userDto, password:hashPassword});
        return this.generateToken(user);
    }
    private async generateToken(user:User){
        const payload = {login: user.login, id: user.id}
        return{
            token: this.jwtService.sign(payload)
        }
    }}