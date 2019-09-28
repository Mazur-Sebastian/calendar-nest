import { AuthGuard } from '@nestjs/passport';
import {
    Controller,
    Post,
    Body,
    Get,
    Patch,
    Param,
    UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { ReservationService } from './reservation.service';
import { DateLockDto } from './dto/dateLock.dto';
import { AvailabilityDto } from './dto/availability.dto';
import { ConfirmationDto } from './dto/confirmation.dto';
import { ReservationDto } from './dto/reservation.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiUseTags('reservation')
@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @ApiBearerAuth()
    @Post('date-lock')
    async dateLock(@Body() dateLockDto: DateLockDto) {
        return this.reservationService.dateLock(dateLockDto);
    }

    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Get('get-all-date-lock')
    async getLockedDate() {
        return this.reservationService.getLockedDates();
    }

    @ApiBearerAuth()
    @Get('reservations/:userId')
    async getReservations(@Param('userId') userId: string) {
        return this.reservationService.getUserReservations(userId);
    }

    @ApiBearerAuth()
    @Post('availability')
    async availability(@Body() availabilityDto: AvailabilityDto) {
        return this.reservationService.setAvailability(availabilityDto);
    }

    @ApiBearerAuth()
    @Post('set-reservation')
    async reservation(@Body() reservationDto: ReservationDto) {
        return this.reservationService.setReservation(reservationDto);
    }

    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Patch('confirm-reservation')
    async confirmReservation(@Body() confirmationDto: ConfirmationDto) {
        return this.reservationService.confirmReservation(confirmationDto);
    }
}
