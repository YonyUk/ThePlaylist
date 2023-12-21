# ThePlaylis social network
This is a litle social network build using Nestjs framwork in the backend, and Angular for the frontend.
Here the people can listen and download music.
The songs ara grouped on playlists. Those playlists are managed by the page owner for now. but the code can be easily changed to
that everybody can upload their musics and create theirs owns playlists and share with the community.

# Details
## Stage of the project
DEVELOPING

The backend-frontend communication was build using GraphQL for the querys and mutations manage, while the upload-download files are
managed through endpoints.
To upload a song the frontend first have to ask a link of upload to the backend, this link is temporal and will be
invalidated in 5 seconds after its emission
