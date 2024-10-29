
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnswerService } from "./answer.service";


@ApiTags('Ответ')
@Controller('/answer')
export class AnswerController{
    constructor(private answerservice: AnswerService){}
    
    
    

}

/** @Get(':id')
  findOne(@Param('id') id: string) 
 */