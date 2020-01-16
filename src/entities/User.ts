import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import Chat from "./Chat";
import Message from "./Message";
import Ride from "./Ride";
import Verification from "./Verification";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "varchar", length: 200, nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "varchar", length: 200 })
  firstName: string;

  @Column({ type: "varchar", length: 200 })
  lastName: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "varchar", length: 200, nullable: true })
  password: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber;

  @Column({ type: "varchar", length: 200 })
  profilePhoto: string;

  @Column({ type: "text", nullable: true })
  fbId: string;
  // 페이스북 ID

  @ManyToOne(
    type => Chat,
    chat => chat.participants
  )
  chat: Chat;

  @OneToMany(
    type => Message,
    message => message.user
  )
  messages: Message[];

  @OneToMany(
    type => Verification,
    verification => verification.user
  )
  verification: Verification[];

  @OneToMany(
    type => Ride,
    ride => ride.passenger
  )
  ridesAsPassenger: Ride[];

  @OneToMany(
    type => Ride,
    ride => ride.driver
  )
  ridesAsDriver: Ride[];

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column({ type: "boolean", default: false })
  isDriving: boolean;
  @Column({ type: "boolean", default: false })
  isRiding: boolean;
  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  @Column({ type: "float", default: 0 })
  lastLng: number;
  @Column({ type: "float", default: 0 })
  lastLat: number;
  @Column({ type: "float", default: 0 })
  lastOrientation: number;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }
  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
