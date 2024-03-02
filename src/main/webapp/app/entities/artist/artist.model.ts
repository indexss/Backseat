import { ITrack } from 'app/entities/track/track.model';
import { IAlbum } from 'app/entities/album/album.model';

export interface IArtist {
  spotifyURI: string;
  name?: string | null;
  tracks?: Pick<ITrack, 'spotifyURI'>[] | null;
  albums?: Pick<IAlbum, 'spotifyURI'>[] | null;
}

export type NewArtist = Omit<IArtist, 'spotifyURI'> & { spotifyURI: null };
