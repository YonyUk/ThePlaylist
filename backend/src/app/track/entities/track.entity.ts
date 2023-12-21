import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Playlist } from '../../playlist/entities/playlist.entity';

@Entity()
@ObjectType()
export class Track {

  @PrimaryColumn('uuid')
  @Field(() => String!, { description: 'Id of the soundtrack' })
  ID: string;

  @Column('text')
  @Field(() => String!, { description: 'Name of the soundtrack' })
  Name: string;

  @Column('text')
  @Field(() => String!, { description: 'Author of the soundtrack' })
  Author: string;

  @Column('numeric')
  @Field(() => Int!, { description: 'Reproductions that the soundtrack has' })
  RepCount: number;

  @ManyToMany(() => Playlist, playlist => playlist.Tracks)
  @JoinTable({ name: 'belong' })
  PlayLists: Playlist[];

}
