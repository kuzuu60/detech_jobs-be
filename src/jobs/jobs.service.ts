import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepo: Repository<Job>,
  ) {}

  findAll(): Promise<Job[]> {
    return this.jobsRepo.find();
  }

  async findOne(id: number): Promise<Job> {
  const job = await this.jobsRepo.findOneBy({ id });
  if (!job) {
    throw new NotFoundException(`Job with id ${id} not found`);
  }
  return job;
}

  async create(dto: CreateJobDto): Promise<Job> {
    const job = this.jobsRepo.create(dto);
    return this.jobsRepo.save(job);
  }

  async update(id: number, dto: Partial<CreateJobDto>): Promise<Job> {
    const job = await this.findOne(id);
    if (!job) throw new NotFoundException(`Job with id ${id} not found`);
    Object.assign(job, dto);
    return this.jobsRepo.save(job);
  }

  async remove(id: number): Promise<{ message: string }> {
    const job = await this.findOne(id);
    if (!job) throw new NotFoundException(`Job with id ${id} not found`);
    await this.jobsRepo.remove(job);
    return { message: `Job with id ${id} has been removed` };
  }
}