import { IsString, IsNotEmpty, IsNumber, IsDateString, IsArray } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  job_description: string;

  @IsString()
  @IsNotEmpty()
  job_category: string;

  @IsString()
  @IsNotEmpty()
  job_level: string;

  @IsNumber()
  @IsNotEmpty()
  no_of_vacancies: number;

  @IsString()
  @IsNotEmpty()
  employment_type: string;

  @IsNumber()
  @IsNotEmpty()
  offered_salary: number;

  @IsDateString()
  @IsNotEmpty()
  apply_before: string;

  @IsNumber()
  @IsNotEmpty()
  experience_required: number;

  @IsArray()
  @IsNotEmpty()
  professional_skill_required: string[];

  @IsArray()
  @IsNotEmpty()
  responsibilities: string[];

  @IsArray()
  @IsNotEmpty()
  qualifications: string[];

  @IsString()
  @IsNotEmpty()
  job_status: string;
}