export interface Track {
    ID: string;
    Name: string;
    Author: string;
    RepCount: number;
    Link: string;
}

export interface PlayList {
    ID: string;
    Name: string;
    Date: Date;
    Tracks: Track[];
}