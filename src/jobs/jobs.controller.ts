import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
// import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { FirebaseAuthGuard } from 'src/auth/firebase/firebase-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enum/roles.enum';
import { SearchJobDto } from './dto/search-job.dto';
import { PaginationDto } from './dto/pagination.dto';
import admin from 'src/config/firebase';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getJobs(@Query() query: PaginationDto) {
  return this.jobsService.findAll(query);
  }
  
  @Get('search')
  async searchJobs(@Query() query: SearchJobDto) {
    return this.jobsService.searchByTitle(query.title);
    }

  @Get(':id')
  async getJob(@Param('id', ParseIntPipe) id: number): Promise<Job> {
    return this.jobsService.findOne(id);
  }

  @Get('firebase-check')
  async firebaseCheck() {
    const result = await admin.auth().listUsers(1);
    return result;
  }

  
  @Post()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createJob(@Body() body: CreateJobDto): Promise<Job> {
    return this.jobsService.create(body);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateJob(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreateJobDto>,
  ): Promise<Job> {
    return this.jobsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteJob(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.jobsService.remove(id);
  }
}