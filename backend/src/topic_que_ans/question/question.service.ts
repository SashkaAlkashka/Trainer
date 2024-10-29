import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "./question.entity";
@Injectable()
export class QuestionService{
    constructor(@InjectRepository(Question)
    private readonly questionRepository: Repository<Question>){}


}