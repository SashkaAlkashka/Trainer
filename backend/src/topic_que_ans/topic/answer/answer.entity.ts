import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Question } from '../question/question.entity';


@Entity('answer')
export class Answer {
  @ApiProperty({example: '1', description: 'Автогенерируемый уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Интеграл - это ', description: 'Текст ответа'})
  @Column({ type: 'varchar', length: 1000, nullable: false })
  text: string;

  @ApiProperty({example: '1', description: 'ID темы'})
  @ManyToOne(() => Question) 
  @JoinColumn({ name: 'question_id' })
  question: Question;
  @Column({ type: 'int', nullable: false }) 
  question_id: number;

}
