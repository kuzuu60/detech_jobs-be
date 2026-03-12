import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Application } from '../../applications/entities/application.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  job_description: string;

  @Column()
  job_category: string;

  @Column()
  job_level: string;

  @Column()
  no_of_vacancies: number;

  @Column()
  employment_type: string;

  @Column()
  offered_salary: number;

  @Column()
  apply_before: string;

  @Column()
  experience_required: number;

  @Column('text', { array: true })
  professional_skill_required: string[];

  @Column('text', { array: true })
  responsibilities: string[];

  @Column('text', { array: true })
  qualifications: string[];

  @Column()
  job_status: string;

  @CreateDateColumn()
  createdAt: Date;

  // relation with applications
  @OneToMany(() => Application, (application) => application.job)
  applications: Application[];
}