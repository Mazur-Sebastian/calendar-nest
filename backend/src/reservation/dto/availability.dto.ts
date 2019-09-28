import { IsMongoId, IsDateString, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AvailabilityDto {
    @ApiModelProperty()
    @IsDateString()
    dateStart: string;

    @ApiModelProperty()
    @IsDateString()
    dateEnd: string;

    @ApiModelProperty()
    @IsMongoId()
    adminId: string;

    @ApiModelProperty()
    @IsBoolean()
    confirmed: boolean;
}
