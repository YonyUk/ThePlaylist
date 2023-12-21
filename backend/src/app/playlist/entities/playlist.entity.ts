import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Track } from '../../track/entities/track.entity';

@Entity()
@ObjectType()
export class Playlist {

  @PrimaryColumn('uuid')
  @Field(() => String!, { description: 'Id of the playlist'})
  ID: string;

  @Column('text')
  @Field(() => String!, { description: 'Name of the playlist'})
  Name: string;

  @Column('date')
  @Field(() => String, { description: 'Date of upload of this playlist'})
  Date: String;

  @ManyToMany(() => Track, track => track.PlayLists)
  Tracks: Track[]

}

@Entity()
@ObjectType()
export class Belong {
  @PrimaryColumn('uuid')
  @Field(() => String!, { description: 'Id of the playlist'})
  playlistID: string;

  @PrimaryColumn('uuid')
  @Field(() => String!, { description: 'Id of the track'})
  trackID: string;
}