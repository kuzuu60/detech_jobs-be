import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Application } from './entities/application.entity';
import { Job } from '../jobs/entities/job.entity';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepo: Repository<Application>,

    @InjectRepository(Job)
    private jobRepo: Repository<Job>,
  ) {}

  async apply(jobId: number, dto: CreateApplicationDto) {

  console.log("Looking for job:", jobId);

  const job = await this.jobRepo.findOneBy({ id: jobId });

  console.log("Job found:", job);

  if (!job) {
    throw new NotFoundException('Job not found');
  }

  const application = this.applicationRepo.create({
    ...dto,
    job,
  });

  return this.applicationRepo.save(application);
}

  async getAllApplications() {
    return this.applicationRepo.find({
      relations: ['job'],
    });
  }
}