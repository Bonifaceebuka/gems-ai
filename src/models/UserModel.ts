import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { UserStatus, UserTypes } from "../common/enums/UserEnums";

@Entity({ name: "users" })
export default class UserModel extends BaseModel {
    @Column({nullable: true, type: 'varchar'})
    first_name?: string | null;

    @Column({nullable: true, type: 'varchar'})
    last_name?: string | null;

    @Column({unique: true, nullable: true, type: 'varchar'})
    otp?: string | null;

    @Column({unique: true, nullable: true, type: 'varchar'})
    verification_token?: string | null;

    @Column({nullable: true, type: 'timestamp'})
    verified_at?: Date;

    @Column({nullable: true, type: 'timestamp'})
    otp_expires_at?: Date | null;

    @Column({nullable: true, type: 'timestamp'})
    token_expires_at?: Date| null;

    @Index()
    @Column({unique: true, type: 'varchar'})
    email!: string;

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: UserTypes,
        default: UserTypes.MERCHANT
    })
    user_type!: UserTypes;

    @Column({
        type: "enum",
        enum: UserStatus,
        default: UserStatus.PENDING
    })
    user_status!: UserStatus;
}