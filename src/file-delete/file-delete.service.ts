import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import * as fsMo from 'fs';
import { formatDate } from 'utils';
const dir = 'testDirectory';
const currentDate = formatDate(new Date());

config();
@Injectable()
export class FileDeleteService {
  /* this function is used to check the number of files in the directory */
  checkFileCount() {
    fsMo.readdir(dir, (err, files: string[]) => {
      if (err) throw new Error();
      if (files.length > parseInt(process.env.LOGS_THRESHOLD, 10)) {
        this.checkTodaysFile(files);
      } else {
        process.stdout.write('Your files are less than logs threshold!!');
      }
    });
  }

  /* Check if file is create today */
  checkTodaysFile(files: string[]) {
    const fileIndex = files.indexOf(`${currentDate}-error.log`);

    if (fileIndex > -1) {
      files.splice(fileIndex, 1);
    }
    this.deleteLogFiles(files);
  }

  /* this function is used to delete log files */
  deleteLogFiles(files: string[]) {
    if (files && files.length > 0) {
      console.log(files);
      try {
        files.forEach((file: string) => {
          const filePath = `${dir}/${file}`;
          fsMo.unlink(filePath, (err) => {
            if (err) {
              throw err;
            }
            process.stdout.write('File is deleted.');
          });
        });
      } catch (error) {
        throw new Error();
      }
    } else {
      process.stdout.write(`No files found in the directory!${dir}`);
    }
  }

  @Cron('45 * * * * *')
  handleCron() {
    console.log('Called when the second is 45');
  }

  @Interval(10000)
  handleInterval() {
    console.log('Called every 10 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    this.checkFileCount();
    console.log('Called once after 5 seconds');
  }
}
