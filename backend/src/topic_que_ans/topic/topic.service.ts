import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Topic } from "./topic.entity";
import { Subject } from "./subject/subject.entity";
import { CreateTopicDto, DeleteTopicDto } from "./dto/create-topic.dto";
import { User } from "src/users/user.entity";
import { UserService } from "src/users/users.service";

@Injectable()
export class TopicService{
    constructor(@InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>,
    private readonly userService: UserService){}

    async findTopicByName(a_name: string): Promise<Topic>{
        const topic = await this.topicRepository.findOne({
            where:{name:a_name}
        })
        return topic;
    }
    async findSubjectByName(a_name: string): Promise<Subject>{
        const subject = await this.subjectRepository.findOne({
            where:{name:a_name}
        })
        return subject;
    }

    async EnsureUniqueness(name: string, user_id: number){
        const topic = await this.findTopicByName(name);
        if (topic.user_id.id==user_id){
            return false;
        }
        return true;
    }
    async findTopicOfUser(name: string, user_id: User){
        const topic = await this.topicRepository.findOne({
            where:{user_id: user_id, name:name}
        })
        return topic;
    }
    async deleteTopic(dto: DeleteTopicDto){
        const user = await this.userService.getUserByLogin(dto.user_login);
        const topic = await this.findTopicOfUser(dto.name, user);
        this.topicRepository.delete(topic.id)
    }

    async createTopic(dto: CreateTopicDto){
        const topic = await this.topicRepository.create();
        const user = await this.userService.getUserByLogin(dto.user_login);
        const unique = await this.EnsureUniqueness(dto.name, user.id);
        if (unique==false){
            throw new UnauthorizedException({message: 'У вас уже существует тема с таким названием.'})
        }
        topic.name=dto.name;
        const sub_name =await this.findSubjectByName(dto.subject_name)
        topic.subject_id=(sub_name);
        topic.user_id=(user);
        topic.public=dto.public;
        await this.topicRepository.save(topic);
        return topic;
    }
    

}