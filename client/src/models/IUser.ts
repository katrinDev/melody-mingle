import { RolesEnum } from "./RolesEnum";

export interface IUser {
  id: string | undefined;
  email: string;
  roles: RolesEnum[];
}
