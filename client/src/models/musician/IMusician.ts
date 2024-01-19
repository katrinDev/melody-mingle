export interface IMusician {
  id: number;
  name: string;
  mainRole: string;
  subRoles: string[] | null;
  city: string;
  experience: number;
  languages: string[];
  genres: string[];
  user?: {
    email: string;
  };
  avatarUrl?: string;
}
