export interface IMusician {
  name: string;
  mainRole: string;
  city: string;
  experience: number;
  languages: string[];
  genres?: string[] | null;
  subRoles?: string[] | null;
}
