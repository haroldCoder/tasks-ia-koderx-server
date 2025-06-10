import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: "times logged in",
        example: 10,
        required: false,
    })
    times_logged?: number;
}