import { Example } from 'tsoa';
import { IsString } from "class-validator";

export class createCustomerDto {
    @IsString({ 
        message: "Customer email is required",
    })
    @Example("a.falaye@gems-consult.com")
    email!: string;

    @IsString({ 
        message: "Customer name is required",
    })
    @Example("Ayodele")
    customer_name!: string;

    @IsString({ 
        message: "Customer phone number is required",
    })
    @Example("Falaye")
    customer_phone!: string;
}

export class createCustomerByAiDto {
    @IsString({ 
        message: "Message body is required",
    })
    @Example("I need you to create a new customer details for me")
    message_body!: string;
}