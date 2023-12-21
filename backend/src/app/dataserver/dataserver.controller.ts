import { UploadedFile, Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, BadRequestException } from '@nestjs/common';
import { DataserverService } from './dataserver.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DataPath } from '../globals';
import { fileNamer } from './fileNamerDTO';
import { ValidateIdInterceptor } from './MyFileInterceptor';
@Controller('dataserver')
export class DataserverController {

  constructor(
    private readonly dataserverService: DataserverService
  ) {
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const file = await this.dataserverService.findOne(id);
    response.sendFile(file);
  }

  @Post(':id')
  @UseInterceptors(
    ValidateIdInterceptor,
    FileInterceptor('file', {
      //options for the upload
      limits: { fileSize: 1024 * 1024 * 10 },
      storage: diskStorage({
        destination: DataPath,
        filename: fileNamer
      })

    }))
  async uploadFile(
    @UploadedFile() file: any,
    @Param('id') id: string
  ) {
    return this.dataserverService.saveTrack(id,file);
  }

}
