import { ITrack } from 'app/entities/track/track.model';
import { IAlbum } from 'app/entities/album/album.model';

export interface IArtist {
  id: number;
  spotifyURI?: string | null;
  name?: string | null;
  tracks?: Pick<ITrack, 'id'>[] | null;
  albums?: Pick<IAlbum, 'id'>[] | null;
}

export type NewArtist = Omit<IArtist, 'id'> & { id: null };
