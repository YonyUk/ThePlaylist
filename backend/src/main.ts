import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exec } from 'child_process';
import { writeFileSync } from 'fs';

//we store the current ip address of our server
(() => {
  exec('ifconfig',(error,stdout,stderr) => {
    let info = stdout.substring(stdout.indexOf('wlan0'));
    info = info.substring(info.indexOf('inet'));
    info = info.split(' ')[1];
    if (!info.includes('.'))
      info = '127.0.0.1';
    const content = {
      CurrentIP: info
    }
    writeFileSync('CurrentIP.json',JSON.stringify(content),'utf-8');
  })
})();


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  // app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10}));
  // app.setGlobalPrefix('API')
  await app.listen(3000);
}
bootstrap();
