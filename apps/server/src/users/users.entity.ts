import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Role } from "src/roles/entities/role.entity";

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

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) this.password = bcrypt.hashSync(this.password, 10);
  }
}
