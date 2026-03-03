import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './job.interface';

@Injectable()
export class JobsService {
    private jobs: Job[] = [];
    private idCounter = 1;

  findAll() {
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

  findOne(id: number) {
    return this.jobs.find((job, index) => index === id);
  }
  
  remove(id: number) {
    this.jobs.splice(id, 1);
    return { message: `Job with id ${id} has been removed` };
  }
}