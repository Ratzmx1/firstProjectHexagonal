import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import UserI from "../../../domain/entities/userEntity";

@Entity()
class User implements UserI {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  userName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  age!: number;

  @Column()
  bio!: string;
}

export { User as UserEntity };
