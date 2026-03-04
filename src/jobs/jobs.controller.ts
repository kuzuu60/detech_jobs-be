import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import type { CreateJobDto } from './dto/create-job.dto';
import type { Job } from './job.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getJobs(): Job[] {
    return this.jobsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createJob(@Body() body: CreateJobDto): Job {
    return this.jobsService.create(body);
  }

  @Get(':id')
  getJob(@Param('id', ParseIntPipe) id: number): Job {
    return this.jobsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteJob(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.jobsService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateJob(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreateJobDto>,
  ): Job {
    return this.jobsService.update(id, body);
  }
}
