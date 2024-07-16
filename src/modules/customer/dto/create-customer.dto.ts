import { IsNotEmpty } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phone: string;
}
