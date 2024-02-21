import {
    // IsString,
    IsNotEmpty,
    IsArray,
    IsDate,
    IsOptional,
    IsMongoId
} from "class-validator"
import { PartialType, ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class CreateOrderDto {
    @ApiProperty({
        description: 'The MongoDB ObjectId of the order',
        example: '5f2f8b3b9b3e3b1e6c3e8e3b',
    })
    @IsNotEmpty()
    @IsMongoId()
    readonly created_by: Types.ObjectId

    @ApiProperty({
        description: 'The products of the order',
        example: "See the example below",
    })
    @IsArray()
    @IsNotEmpty()
    readonly products: Types.ObjectId[]

    @ApiProperty({
        description: 'The total of the order',
        example: 198,
    })
    @IsDate()
    @IsOptional()
    readonly created_at: Date

    @ApiProperty({
        description: 'The date of the order',
        example: new Date(),
    })
    @IsDate()
    @IsOptional()
    readonly updated_at: Date

    @ApiProperty({
        description: 'The date of the order',
        example: new Date(),
    })
    @IsDate()
    @IsOptional()
    readonly deleted_at: Date
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) { }