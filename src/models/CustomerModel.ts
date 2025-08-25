import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity({ name: "customers" })
export default class CustomerModel extends BaseModel {
    @Column({nullable: true})
    company_name?: string;

    @Column({nullable: true})
    phone?: string;

    @Column({unique: true,nullable: true})
    email?: string;

    @Column({nullable: true})
    guest_id?: string;

    @Column()
    shop_id!: number;

    @Column({unique: true, nullable: true})
    store_issued_uuid?: string;
}