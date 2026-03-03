import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './job.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getJobs(): Job[] {
  return this.jobsService.findAll();
}
  @Post()
  createJob(@Body() body: CreateJobDto) {
    return this.jobsService.create(body);
  }
  @Get(':id') 
  getJob(@Param('id') id:string) {
    return this.jobsService.findOne(Number(id));
  }
  @Delete(':id')
  deleteJob(@Param('id') id:string){
    return this.jobsService.remove(Number(id));
  }
//   @Post()
//   createJob(@Body() body: any) {
//     return this.jobsService.create(body);
//   }
}