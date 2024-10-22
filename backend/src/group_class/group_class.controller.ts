
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesAuthGuard } from "src/auth/roles-auth.guard";
import { GroupClassService } from "./group_class.service";

@ApiTags('Поток_Группа')
@Controller('/group_class')
export class GroupClassController{
    constructor(private groupclassservice: GroupClassService){}
    
    @ApiOperation({ summary: 'Вывод всех групп потока' }) 
    @Get(':group_id') //TODO add handle
    getClassesOfGroup(@Param('group_id') group_id: number){
        return this.groupclassservice.getClassesOfGroup(group_id);
    }
    

}

/** @Get(':id')
  findOne(@Param('id') id: string) 
 */