import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { StatisticsService } from './statistics.service';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiUseTags('statistics')
@UseGuards(AuthGuard('jwt'))
@UseGuards(RolesGuard)
@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticService: StatisticsService) {}

    @ApiBearerAuth()
    @Get('reservations')
    async getLockedDate() {
        return this.statisticService.getReservationStatistics();
    }
}
