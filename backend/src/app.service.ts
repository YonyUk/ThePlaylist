import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Ave Maria<audio src="http://localhost:3000/dataserver/1" autoplay="true" controls="true">';
  }
}