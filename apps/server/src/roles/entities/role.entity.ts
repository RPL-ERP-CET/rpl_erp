import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Permission } from "src/permissions/permissions.entity";
import { User } from "src/users/users.entity";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, type: "varchar" })
  name!: string;

  @Column({ type: "int", default: 1 })
  priority!: number;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable()
  users!: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    eager: true,
  })
  @JoinTable()
  permissions!: Permission[];
}
