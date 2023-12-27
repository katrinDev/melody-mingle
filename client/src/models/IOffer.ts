export interface IOffer {
  id: number;
  headline: string;
  body: string;
  mainRoles: string[];
  genres: string[];
  location: string;
  expirationDate: Date;
  photoUrl: string;
  createdAt: Date;
  musician: {
    name: string;
    user: {
      email: string;
    };
  };
}
