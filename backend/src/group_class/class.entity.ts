import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Group } from './group.entity'; // Импортируем Group

@Entity('class')
export class Class {
  @ApiProperty({example: '1', description: 'Автогенерируемый уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'БИВТ-22-СП-1', description: 'Наименование группы'})
  @Column({ type: 'varchar', length: 30, unique: true, nullable: false })
  name: string;

  @ApiProperty({example: '1', description: 'ID потока, к которому принадлежит группа'})

  @ManyToOne(() => Group, (group) => group.id)
    group_id: Group

}
