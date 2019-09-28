import { IsMongoId, IsDateString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DateLockDto {
    @ApiModelProperty()
    @IsDateString()
    lockedDate: string;

    @ApiModelProperty()
    @IsMongoId()
    adminId: string;
}
