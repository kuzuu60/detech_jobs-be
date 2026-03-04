import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './job.interface';

@Injectable()
export class JobsService {
  private jobs: Job[] = [];
  private idCounter = 1;

  findAll(): Job[] {
    return this.jobs;
  }

  create(job: CreateJobDto): Job {
    const newJob: Job = {
      id: this.idCounter++,
      ...job,
    };

    this.jobs.push(newJob);
    return newJob;
  }

  findOne(id: number): Job {
    const job = this.jobs.find((job) => job.id === id);

    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }

    return job;
  }

  update(id: number, updatedData: Partial<CreateJobDto>): Job {
    const job = this.findOne(id);

    Object.assign(job, updatedData);

    return job;
  }

  remove(id: number): { message: string } {
    const index = this.jobs.findIndex((job) => job.id === id);

    if (index === -1) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }

    this.jobs.splice(index, 1);

    return { message: `Job with id ${id} has been removed` };
  }
}
