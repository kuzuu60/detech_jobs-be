import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enum/roles.enum';

@Controller('applications')
export class ApplicationsController {
  constructor(private appService: ApplicationsService) { }


  @Post(':jobId')
  async apply(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() body: CreateApplicationDto,
  ) {
    return this.appService.apply(jobId, body);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getAll() {
    return this.appService.getAllApplications();
  }
}