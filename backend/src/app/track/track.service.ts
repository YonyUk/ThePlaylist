import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { v4 } from 'uuid';
import { OKStatus, OKOperationMessage, ERRORStatus, ERRORInvalidDataMessage } from '../globals';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { readFileSync } from 'fs';
@Injectable()
export class TrackService {

  CurrentIP: string;

  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>
  ) { 
    this.CurrentIP = JSON.parse(readFileSync('CurrentIP.json','utf-8')).CurrentIP;
    if(!this.CurrentIP.includes('.'))
      this.CurrentIP = 'localhost';
  }

  async create(createTrackInput: CreateTrackInput) {

    const input = plainToClass(CreateTrackInput, createTrackInput);
    const errors = await validate(input);

    if (errors.length > 0) {
      return {
        Status: ERRORStatus,
        Message: `${ERRORInvalidDataMessage} on property ${errors[0].property}: ${errors[0].value}`,
        ID: 'null'
      };
    }

    const ID = v4();
    const track = {
      ID,
      ...createTrackInput,
      RepCount: 0
    };
    try {
      await this.trackRepository.insert(track);
      return {
        Status: OKStatus,
        Message: OKOperationMessage,
        ID: track.ID
      };
    } catch (error) {
      return {
        Status: ERRORStatus,
        Message: error,
        ID: 'null'
      };
    }
  }

  async findAll() {
    const tracks = await this.trackRepository.find({});
    let response = [];
    // const Link = `http://localhost:3000/dataserver/${ID}`;

    for (let track of tracks) {
      const t = {
        ...track,
        Link: `http://${this.CurrentIP}:3000/dataserver/${track.ID}`
      }
      response.push(t);
    }
    return response;
  }

  async findByAuthorAndName(author: string, name: string) {
    return await this.trackRepository.findBy({
      Author: author,
      Name: name
    });
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ ID: id });
    const result = {
      ...track,
      Link: `http://${this.CurrentIP}:3000/dataserver/${track.ID}`  
    };
    return result;
  }

  async update(id: string, updateTrackInput: UpdateTrackInput) {
    return await this.trackRepository.update(id, updateTrackInput);
  }

  async remove(id: string) {
    try {
      await this.trackRepository.delete(id);
      return {
        Status: OKStatus,
        Message: OKOperationMessage,
        ID: id
      };
    } catch (error) {
      return {
        Status: ERRORStatus,
        Message: error,
        ID: 'null'
      };
    }
  }
}
