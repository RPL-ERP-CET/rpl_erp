import { User } from "src/users/users.entity";

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
