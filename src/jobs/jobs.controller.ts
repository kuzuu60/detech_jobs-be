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
  import { CreateJobDto } from './dto/create-job.dto';
  import type { Job } from './job.interface';

  import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
  import { RolesGuard } from '../auth/guard/roles.guard';
  import { Roles } from '../auth/decorator/roles.decorator';
  import { Role } from '../auth/enum/roles.enum';

  @Controller('jobs')
  export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get()
    getJobs(): Job[] {
      return this.jobsService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    createJob(@Body() body: CreateJobDto): Job {
      return this.jobsService.create(body);
    }

    @Get(':id')
    getJob(@Param('id', ParseIntPipe) id: number): Job {
      return this.jobsService.findOne(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    deleteJob(@Param('id', ParseIntPipe) id: number): { message: string } {
      return this.jobsService.remove(id);
    }


    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    updateJob(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: Partial<CreateJobDto>,
    ): Job {
      return this.jobsService.update(id, body);
    }
  }
