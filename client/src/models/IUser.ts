import { RolesEnum } from "./RolesEnum";

export interface IUser {
  id: number;
  email: string;
  roles: RolesEnum[];
}
