import { verificationTarget } from "src/types/types";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";

export enum vTarget {
  PHONE = "PHONE",
  EMAIL = "EMAIL"
}

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "varchar", length: 200, enum: vTarget })
  target: verificationTarget;

  @Column({ type: "varchar", length: 200 })
  payload: string;

  @Column({ type: "varchar", length: 200 })
  key: string;

  @Column({ type: "boolean", default: false })
  used: boolean;

  @ManyToOne(
    type => User,
    user => user.verification
  )
  user: User;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  @BeforeInsert()
  createKey(): void {
    if (this.target === "PHONE") {
      this.key = Math.floor(Math.random() * 100000).toString(); // 임의의 5자리 숫자 생성
    } else {
      this.key = Math.random()
        .toString(36)
        .substr(2); // 임의 문자열 생성
    }
  }
}

export default Verification;
