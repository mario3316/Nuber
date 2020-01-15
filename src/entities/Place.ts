import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "varchar", length: 200 })
  name: string;
  @Column({ type: "float", default: 0 })
  lat: number;
  @Column({ type: "float", default: 0 })
  lng: number;
  @Column({ type: "varchar", length: 200 })
  address: string;
  @Column({ type: "boolean" })
  isFav: string;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Place;
