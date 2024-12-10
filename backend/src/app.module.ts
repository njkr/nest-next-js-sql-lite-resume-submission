import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from './resume/resume.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ResumeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
