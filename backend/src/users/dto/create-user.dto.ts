import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: 'name@example.com', description: 'Логин пользователя (почта)'})
    login: string;
    @ApiProperty({example: 'abC123', description: 'Пароль пользователя'})
    password: string;
    @ApiProperty({example: 'Anna', description: 'Имя пользователя'})
    name: string;
    @ApiProperty({example: 'БИВТ-22-2', description: 'Группа пользователя'})
    class: string;

}
export class LoginUserDto{
    @ApiProperty({example: 'name@example.com', description: 'Логин пользователя (почта)'})
    login: string;
    @ApiProperty({example: 'abC123', description: 'Пароль пользователя'})
    password: string;

}