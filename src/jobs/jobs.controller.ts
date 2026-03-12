import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enum/roles.enum';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async getJobs(): Promise<Job[]> {
    return await this.jobsService.findAll();
  }

  @Get(':id')
  async getJob(@Param('id', ParseIntPipe) id: number): Promise<Job> {
    return await this.jobsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createJob(@Body() body: CreateJobDto): Promise<Job> {
    return await this.jobsService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateJob(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreateJobDto>,
  ): Promise<Job> {
    return await this.jobsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteJob(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return await this.jobsService.remove(id);
  }
}