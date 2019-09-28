import { IsMongoId, IsDateString, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ReservationDto {
    @ApiModelProperty()
    @IsDateString()
    reservationDate: string;

    @ApiModelProperty()
    @IsMongoId()
    adminId: string;

    @ApiModelProperty()
    @IsMongoId()
    userId: string;

    @ApiModelProperty()
    @IsBoolean()
    confirmed: boolean;
}
