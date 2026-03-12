import { IsString, IsEmail, IsUrl, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsUrl()
  @IsOptional()
  resume_url: string;
}