export interface listEntry {
  id: number; // no usage, generated by jhipster
  idToDisplay: number;
  itemName: string; //Could be album or single track
  itemUri: string; //Could be album or single track
  artists: string;
  albumName?: string; //if it is track, album name, if not then empty
  reviewsCount: number;
  rating: number; // float number form 0 to 5
  addTime: Date;
  releaseTime: Date;
  coverImgUrl?: string; //Album Cover image
  isFocus?: boolean;
}
