import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

import { Application } from './entities/application.entity';
import { Job } from '../jobs/entities/job.entity';
// import firebase from 'firebase/compat/app';
// import { FirebaseModule } from 'src/auth/firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, Job]),
    // FirebaseModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}