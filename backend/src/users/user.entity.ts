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
  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  login: string;
  @ApiProperty({example: 'abC123', description: 'Пароль пользователя'})
  @Column({ type: 'varchar', length: 100, unique: false, nullable: true })
  password: string;
  @ApiProperty({example: 'true', description: 'Подтверждена ли почта'})
  @Column({ type: 'boolean', unique: false, nullable: true })
  isActivated: boolean;
  @ApiProperty({example: 'Nick', description: 'Ник пользователя'})
  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  name: string;
  @ApiProperty({example: '1', description: 'Id группы пользователя'})
  @Column({ type: 'integer', unique: false, nullable: true })
  class_id: number;
  @ApiProperty({example: 'guest', description: 'Роль пользователя'})
  @Column({ type: 'varchar', length: 100, unique: false, nullable: false })
  role: string;
}