import { IsOptional, IsPositive, Min, ValidateIf } from "class-validator";

export class FilterProductsDTO {
    @IsOptional()
    @IsPositive()
    limit: number

    @IsOptional()
    @Min(0)
    offset: number

    @IsOptional()
    name: string

    @IsOptional()
    @Min(0)
    minPrice: number

    @ValidateIf((params) => params.minPrice)
    @IsPositive()
    maxPrice: number
}