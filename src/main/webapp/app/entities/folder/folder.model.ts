import { IProfile } from 'app/entities/profile/profile.model';

export interface IFolder {
  id: number;
  name?: string | null;
  image?: string | null;
  imageContentType?: string | null;
  profile?: Pick<IProfile, 'id'> | null;
}

export type NewFolder = Omit<IFolder, 'id'> & { id: null };
