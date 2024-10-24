
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
    
    
    

}

/** @Get(':id')
  findOne(@Param('id') id: string) 
 */