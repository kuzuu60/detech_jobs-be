import { CreateJobDto } from './dto/create-job.dto';

export interface Job extends CreateJobDto {
  id: number;
}