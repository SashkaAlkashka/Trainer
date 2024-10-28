
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TopicService } from "./topic.service";


@ApiTags('Тема')
@Controller('/topic')
export class TopicController{
    constructor(private topicservice: TopicService){}
    
    
    

}

/** @Get(':id')
  findOne(@Param('id') id: string) 
 */