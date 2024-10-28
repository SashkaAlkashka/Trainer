import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Topic } from "./topic.entity";
@Injectable()
export class TopicService{
    constructor(@InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>){}


}