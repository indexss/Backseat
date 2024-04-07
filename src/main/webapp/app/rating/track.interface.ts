import { Review } from './review.interface';

export interface Track {
  spotifyURI: string;
  trackName: string;
  artistName: string;
  releaseDate: string;
  rating: number;
}
