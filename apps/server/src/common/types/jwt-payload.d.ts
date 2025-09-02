import { UUID } from "crypto";

export type JwtPayload = {
  id: string;
  jti: UUID;
};
