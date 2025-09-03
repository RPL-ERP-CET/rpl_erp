import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Role } from "src/roles/entities/role.entity";
import { Session } from "src/session/entities/session.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar", select: false })
  password!: string;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable()
  roles!: Role[];

  @OneToMany(() => Session, (session) => session.user, { eager: true })
  sessions!: Session[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) this.password = bcrypt.hashSync(this.password, 10);
  }
}
