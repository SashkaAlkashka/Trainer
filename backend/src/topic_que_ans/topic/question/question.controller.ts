
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QuestionService } from "./question.service";


@ApiTags('Вопрос')
@Controller('/question')
export class QuestionController{
    constructor(private questionservice: QuestionService){}
    
    
    

}

/** @Get(':id')
  findOne(@Param('id') id: string) 
 */