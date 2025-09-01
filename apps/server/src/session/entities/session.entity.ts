import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/users.entity";

@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  refresh_token!: string;

  @Column({ type: "timestamptz" })
  expires!: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: "userId" })
  user!: User;
}
