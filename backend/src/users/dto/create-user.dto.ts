import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: 'name@example.com', description: 'Логин пользователя (почта)'})
    login: string;
    @ApiProperty({example: 'abC123', description: 'Пароль пользователя'})
    password: string;
}
