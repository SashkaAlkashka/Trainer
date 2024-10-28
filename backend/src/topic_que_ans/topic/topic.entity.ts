import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Subject } from './subject/subject.entity'
import { User } from 'src/users/user.entity';

@Entity('topic')
export class Topic {
  @ApiProperty({example: '1', description: 'Автогенерируемый уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Интегралы', description: 'Наименование темы'})
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @ApiProperty({example: '1', description: 'ID предмета'})
  @ManyToOne(() => Subject) 
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;
  @Column({ type: 'int', nullable: false }) 
  subject_id: number;

  @ApiProperty({example: '1', description: 'ID пользователя-создателя'})
  @ManyToOne(() => User) 
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Column({ type: 'int', nullable: false }) 
  user_id: number;

  @ApiProperty({example: 'false', description: 'Публикация темы'})
  @Column({ type: 'boolean', nullable: false, default: false })
  public: boolean;

}
