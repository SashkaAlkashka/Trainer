import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: 'name@example.com', description: 'Логин пользователя (почта)'})
    login: string;
    @ApiProperty({example: 'abC123', description: 'Пароль пользователя'})
    password: string;
    @ApiProperty({example: 'Nick', description: 'Ник пользователя'})
    name: string;
    @ApiProperty({example: '1', description: 'Id группы пользователя'})
    class_id: number;

}
