import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Permission } from "../../permissions/permissions.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  priority!: number;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable()
  permissions!: Permission[];
}
