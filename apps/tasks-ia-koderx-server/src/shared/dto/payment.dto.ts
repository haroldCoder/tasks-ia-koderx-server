import { IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreatePaymentDto {
    @ApiProperty({
        description: 'URL to redirect after successful payment',
        example: 'https://yourdomain.com/success'
    })
    @IsString()
    success_url: string;

    @ApiProperty({
        description: 'URL to redirect if payment is cancelled',
        example: 'https://yourdomain.com/cancel'
    })
    @IsString()
    cancel_url: string;

    @ApiProperty({
        description: 'Stripe price ID for the subscription',
        example: 'price_H2UE4e3XEWwq9j',
        required: false
    })
    @IsString()
    priceId?: string;
}