import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';


@Injectable()
export class JobsService {
//   private jobs: any[] = [];;
    private jobs: CreateJobDto[] = [];

    
  findAll() {
    return this.jobs;
  }
  
  create(job: CreateJobDto) {
    this.jobs.push(job);
    return job;
    }

//   create(job: any) {
//     this.jobs.push(job);
//     return job;
//   }
}