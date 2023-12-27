export interface IMusician {
  id: number;
  name: string;
  mainRole: string;
  city: string;
  experience: number;
  languages: string[];
  genres: string[];
  subRoles: string[] | null;
  user: {
    email: string;
  };
  avatarUrl: string;
}
