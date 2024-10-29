import { ApiProperty } from "@nestjs/swagger";

export class CreateTopicDto{
    @ApiProperty({example: 'Интегралы', description: 'Название темы'})
    name: string;
    @ApiProperty({example: 'Математика', description: 'Название предмета'})
    subject_name: string;
    @ApiProperty({example: '', description: 'Почта текущего пользователя'})
    user_login: string;

    @ApiProperty({example: 'false', description: 'Публикация темы'})
    public: boolean;

}
export class DeleteTopicDto{
    @ApiProperty({example: 'Интегралы', description: 'Название темы'})
    name: string;
    @ApiProperty({example: '', description: 'Почта текущего пользователя'})
    user_login: string;
}

