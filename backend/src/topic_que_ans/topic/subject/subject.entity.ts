import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,

} from 'typeorm';

@Entity('subject')
export class Subject {
  @ApiProperty({example: '1', description: 'Автогенерируемый уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Математика', description: 'Наименование предмета'})
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

}
