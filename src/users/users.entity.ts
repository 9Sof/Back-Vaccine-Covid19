import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column() name_prefix: string;

    @Column() first_name: string;

    @Column() last_name: string;

    @Column() id_card: string;

    @Column() birthdate: Date;

    @Column() email: string;

    @Column() phone_number: string;

    @Column() vaccination_date: Date;

}