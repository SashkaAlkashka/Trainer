
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { GroupClassService } from "./group_class.service";

@ApiTags('Поток_Группа')
@Controller('/group_class')
export class GroupClassController{
    constructor(private groupclassservice: GroupClassService){}
    
    
    

}

/** @Get(':id')
  findOne(@Param('id') id: string) 
 */