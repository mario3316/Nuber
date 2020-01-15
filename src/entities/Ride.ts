import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { rideStatus } from "../types/types";
import User from "./User";

export enum ride_status {
  ACCEPTED = "ACCEPTED",
  FINISHED = "FINISHED",
  CANCELED = "CANCELED",
  REQUESTING = "REQUESTING",
  ONROUTE = "ONROUTE"
}

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({
    type: "varchar",
    length: 200,
    enum: ride_status
  })
  status: rideStatus;

  @Column({ type: "varchar", length: 200 })
  pickUpAddress: string;

  @Column({ type: "float", default: 0 })
  pickUpLat: number;

  @Column({ type: "float", default: 0 })
  pickUpLng: number;

  @Column({ type: "varchar", length: 200 })
  dropOffAddress: string;

  @Column({ type: "float", default: 0 })
  dropOffLat: number;

  @Column({ type: "float", default: 0 })
  dropOffLng: number;

  @Column({ type: "float", default: 0 })
  price: number;

  @Column({ type: "varchar", length: 200 })
  distance: string;

  @Column({ type: "varchar", length: 200 })
  duration: string;

  @ManyToOne(
    type => User,
    user => user.ridesAsPassenger
  )
  passenger: User;

  @ManyToOne(
    type => User,
    user => user.ridesAsDriver
  )
  driver: User;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Ride;
