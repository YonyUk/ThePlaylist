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

export const GET_UPLOAD_LINK = gql`
mutation GetUploadLink(
  $file:String!,
  $playlistid:String!,
  $mimetype:String!,
  $author:String!
){
  askForUpload(
    filename:$file,
    playlistID:$playlistid,
    mimetype:$mimetype,
    author:$author
  ){
    Link
  }
}
`;

export const CREATE_PLAYLIST = gql`
mutation CreatePlaylist($input:CreatePlaylistInput!){
  createPlaylist(createPlaylistInput:$input){
    Status
    Message
    ID
  }
}
`;

export const DELETE_TRACK_FROM_PLAYLIST = gql`
 mutation DeletTrackFromPlaylist($trackid:String!,$playlistid:String!){
  quitTrackFromPlayList(trackid:$trackid,playlistid:$playlistid){
    Status
    Message
		ID
  }
}
`;