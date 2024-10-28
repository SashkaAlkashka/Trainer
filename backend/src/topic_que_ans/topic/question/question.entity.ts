import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Topic } from '../topic.entity';


@Entity('question')
export class Question {
  @ApiProperty({example: '1', description: 'Автогенерируемый уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Что такое интеграл?', description: 'Текст вопроса'})
  @Column({ type: 'varchar', length: 1000, nullable: false })
  text: string;

  @ApiProperty({example: '1', description: 'ID темы'})
  @ManyToOne(() => Topic) 
  @JoinColumn({ name: 'topic_id' })
  subject: Topic;
  @Column({ type: 'int', nullable: false }) 
  topic_id: number;


  @ApiProperty({example: '1', description: 'Тип вопроса (1, 2, 3)'})
  @Column({ type: 'int', nullable: false, default: 1 })
  type: number;

}
