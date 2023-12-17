import { Request } from 'express';
import { Role } from 'src/roles/roles.model';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    roles: Role[];
    musicianId: number;
  };
}

export default RequestWithUser;
