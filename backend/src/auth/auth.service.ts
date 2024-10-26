
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, LoginUserDto } from "src/users/dto/create-user.dto";
import { UserService } from "src/users/users.service";
import * as bcrypt from 'bcryptjs';
import { User } from "src/users/user.entity";
import * as nodemailer from 'nodemailer';

import mailgunTransport from 'nodemailer-mailgun-transport';
@Injectable()
export class AuthService{
    constructor(private userService: UserService,
                private jwtService:JwtService
    ){}

    async confirm(token: string){
        try{
            const user_id = this.jwtService.verify(token, { secret: process.env.EMAIL_SECRET });
            if (this.userService.getUserById(Number(user_id))==null){
                throw new UnauthorizedException({message: 'Некорректный токен доступа'})
            }

            await this.userService.updateUserActivation(user_id);
        } catch(e){
            throw new UnauthorizedException({message: 'Некорректный токен доступа'})
        }
    }

    async login(userDto: LoginUserDto){
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }
    private async validateUser(userDto: LoginUserDto){
        const user = await this.userService.getUserByLogin(userDto.login);
        if (user == null){
            throw new UnauthorizedException({message: 'Не существует пользователя с таким логином'})
        }
        if (user.isActivated==false){
            throw new UnauthorizedException({message: 'Подтвердите почту'})
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
        const token =await this.generateTokenId(user.id);
        //await this.sendConfirmationEmail(userDto.login, token);
        return this.generateToken(user);
    }
    private async generateTokenId(id:number){
        const a =this.jwtService.sign({ id: id }, { secret:process.env.EMAIL_SECRET, expiresIn: '1h' });
        console.log(a)
        return a
    }
    private async generateToken(user:User){
        const payload = {login: user.login, id: user.id, isActivated: user.isActivated, role: user.role}
        return{
            token: this.jwtService.sign(payload)
        }
    }
    private async sendConfirmationEmail(toEmail: string, token: string) {
        // Настройки для nodemailer
        const mailgunAuth = {
            auth: {
                api_key: process.env.MAILGUN_API_KEY, // Ваш Mailgun API-ключ
                domain: process.env.MAILGUN_DOMAIN,   // Ваш домен, например, mg.yourdomain.com
            },
        };
        
        const transporter = nodemailer.createTransport(mailgunTransport(mailgunAuth));

        // Содержание письма
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: toEmail,
            subject: 'Подтверждение почты',
            text: `Здравствуйте! Пожалуйста, подтвердите ваш email, перейдя по следующей ссылке: http://localhost:5173//confirm/${token}`,
            html: `<p>Здравствуйте! Пожалуйста, подтвердите ваш email, перейдя по следующей ссылке: <a href="http://localhost:5173//confirm/${token}">Подтвердить email</a></p>`,
        };

        // Отправка письма
        await transporter.sendMail(mailOptions);
    }

}