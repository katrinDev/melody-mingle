import { RolesEnum } from "./RolesEnum";

export class User {
  id: string | undefined;
  email: string;
  roles: RolesEnum[];

  constructor(id: string, email: string, roles: RolesEnum[]) {
    this.id = id;
    this.email = email;
    this.roles = roles;
  }
}
