import { gql } from 'apollo-angular';

export const GET_TRACK = gql`
query GetTrack($id:String!){
    track(id:$id){
      Name
      Author
      RepCount
      Link
    }
  }
`;

export const GET_PLAYLISTS = gql`
query GetPlaylists{
    playlists{
      Name
      Date
      ID
      Tracks{
        Name
        ID
        Author
        RepCount
      }
    }
  }
`;

export const GET_PLAYLIST = gql`
query GetPlaylist($playlistid:String!){
    playlist(id:$playlistid){
      Name
      ID
      Date
      Tracks{
        ID
        Name
        RepCount
        Author
      }
    }
  }
`;