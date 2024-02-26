import dayjs from 'dayjs/esm';
import { IFolder } from 'app/entities/folder/folder.model';

export interface IFolderEntry {
  id: number;
  folderID?: string | null;
  spotifyURI?: string | null;
  addTime?: dayjs.Dayjs | null;
  folder?: Pick<IFolder, 'id'> | null;
}

export type NewFolderEntry = Omit<IFolderEntry, 'id'> & { id: null };
