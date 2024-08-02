import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @ApiProperty({example: '1', description: 'Автогенерируемый уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({example: 'name@example.com', description: 'Логин пользователя (почта)'})
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  login: string;
  @ApiProperty({example: 'abC123', description: 'Пароль пользователя'})
  @Column({ type: 'varchar', length: 100, unique: false, nullable: false })
  password: string;
}