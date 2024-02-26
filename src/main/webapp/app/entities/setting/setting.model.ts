export interface ISetting {
  id: number;
  userID?: string | null;
  key?: string | null;
  value?: string | null;
}

export type NewSetting = Omit<ISetting, 'id'> & { id: null };
