import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileDeleteModule } from './file-delete/file-delete.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [FileDeleteModule, ScheduleModule.forRoot(), EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
