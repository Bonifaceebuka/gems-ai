import { Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import { BaseModel } from "./BaseModel";
import UserModel from "./UserModel";

@Entity({ name: "customers" })
export default class CustomerModel extends BaseModel {
    @Column()
    customer_name!: string;

    @Column()
    customer_phone!: string;

    @Column({unique: true})
    email!: string;

    @Column()
    created_by!: number;

    @ManyToOne (() => UserModel, (user)=>user.created_customers)
    @JoinColumn({ name: 'created_by', referencedColumnName: 'id'})
    staff!: UserModel;
}