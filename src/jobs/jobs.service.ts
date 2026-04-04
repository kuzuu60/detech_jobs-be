import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { ILike } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';


@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepo: Repository<Job>,
  ) {}

  async findAll(query: PaginationDto): Promise<any> {
  const parsedPage = parseInt(query.page ?? '1', 10);
  const parsedLimit = parseInt(query.limit ?? '10', 10);

  const page = isNaN(parsedPage) ? 1 : parsedPage;
  const limit = isNaN(parsedLimit) ? 10 : parsedLimit;

  const skip = (page - 1) * limit;

  const [jobs, total] = await this.jobsRepo.findAndCount({
    skip,
    take: limit,
  });

  return {
    data: jobs,
    total,
    page,
    lastPage: Math.ceil(total / limit),
  };
}

  async findOne(id: number): Promise<Job> {
  const job = await this.jobsRepo.findOneBy({ id });
  if (!job) {
    throw new NotFoundException(`Job with id ${id} not found`);
  }
  return job;
}

  async searchByTitle(title?: string): Promise<Job[]> {
  if (!title) return [];

  return this.jobsRepo.find({
    where: {
      title: ILike(`%${title}%`),
    },
  });
}
   
  async create(dto: CreateJobDto): Promise<Job> {
    const job = this.jobsRepo.create(dto);
    return this.jobsRepo.save(job);
  }

  async update(id: number, dto: Partial<CreateJobDto>): Promise<Job> {
    const job = await this.findOne(id);
    Object.assign(job, dto);
    return this.jobsRepo.save(job);
  }

  async remove(id: number): Promise<{ message: string }> {
    const job = await this.findOne(id);
    await this.jobsRepo.remove(job);
    return { message: `Job with id ${id} has been removed` };
  }
}


