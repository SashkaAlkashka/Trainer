import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Answer } from "./answer.entity";
@Injectable()
export class AnswerService{
    constructor(@InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>){}


}