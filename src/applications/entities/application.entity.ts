import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Job } from '../../jobs/entities/job.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  resume_url: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Job, (job) => job.applications, {
    onDelete: 'CASCADE',
  })
  job: Job;
}