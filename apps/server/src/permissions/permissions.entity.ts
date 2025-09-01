import { Role } from "src/roles/entities/role.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  name!: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];
}
