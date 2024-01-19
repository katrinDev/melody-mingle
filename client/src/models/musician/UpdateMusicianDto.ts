export interface UpdateMusicianDto {
  name?: string;
  mainRole?: string;
  city?: string;
  experience?: number;
  languages?: string[];
  genres?: string[];
  subRoles?: string[] | null;
}
