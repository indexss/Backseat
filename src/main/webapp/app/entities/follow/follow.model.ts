export interface IFollow {
  id: number;
  sourceUserID?: string | null;
  targetUserID?: string | null;
}

export type NewFollow = Omit<IFollow, 'id'> & { id: null };
