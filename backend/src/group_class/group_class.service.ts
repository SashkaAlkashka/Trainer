import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "./group.entity";
import { Class } from "./class.entity";
@Injectable()
export class GroupClassService{
    constructor(@InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>){}

    async confirmExistanceOfClass(a_name: string): Promise<Class>{
        const class_ = await this.classRepository.findOne({
            where:{name:a_name}
        })
        if (class_ == null){
            throw new UnauthorizedException({message: 'Такой группы не существует'})
        }
        return class_;
    }

    async findClassByName(a_name: string): Promise<Class>{
        const class_ = await this.classRepository.findOne({
            where:{name:a_name}
        })
        return class_;
    }
    async findGroupByName(a_name: string): Promise<Group>{
        const group = await this.groupRepository.findOne({
            where:{name:a_name}
        })
        return group;
    }
    async findGroupsByYear(a_year: string): Promise<Group[]>{
        const current_year = new Date().getFullYear();
        const current_month = new Date().getMonth();
        let year_of_study = 0;
        if (current_month <8){ //если январь-август, 2й семестр
            year_of_study =current_year-Number(a_year)-1;
        }
        else{ //если сентябрь-декабрь, 1й семестр
            year_of_study =current_year-Number(a_year);
        }
        const groups = await this.groupRepository
            .createQueryBuilder('group')
            .where("SUBSTRING_INDEX(group.name, '-', -2) LIKE :year_of_study", { year_of_study: `%${year_of_study}%` })
            .getMany();
        return groups;
    };

    
    async getClassesOfGroup(group_name: string): Promise<Class[]> {
        const group_id = await this.findGroupByName(group_name);
        const classes = await this.classRepository.find({
            where: { id: group_id.id  },
        });
        return classes;
    }

}