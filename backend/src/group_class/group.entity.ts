import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('group')
export class Group {
  @ApiProperty({example: '1', description: 'Автогенерируемый уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({example: 'БИВТ-22-СП-(1-5)', description: 'Наименование потока'})
  @Column({ type: 'varchar', length: 30, unique: true, nullable: false })
  name: string;
  @ApiProperty({example: '1', description: 'ID института, к которому принадлежит поток'})
  @Column({ type: 'varchar', length: 100, unique: false, nullable: false })
  department_id: number;
}