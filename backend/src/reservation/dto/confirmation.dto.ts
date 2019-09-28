import { IsMongoId, IsDateString, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ConfirmationDto {
    @ApiModelProperty()
    @IsMongoId()
    adminId: string;

    @ApiModelProperty()
    @IsMongoId()
    reservationId: string;

    @ApiModelProperty()
    @IsBoolean()
    confirmed: boolean;
}
