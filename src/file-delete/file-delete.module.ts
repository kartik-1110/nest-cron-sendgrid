import { Module } from '@nestjs/common';
import { FileDeleteService } from './file-delete.service';

@Module({
  providers: [FileDeleteService],
})
export class FileDeleteModule {}
