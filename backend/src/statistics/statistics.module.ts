import { Module } from '@nestjs/common';

import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { reservationProviders } from 'src/reservation/reservation.providers';
import { ReservationService } from 'src/reservation/reservation.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [StatisticsController],
    providers: [StatisticsService, ReservationService, ...reservationProviders],
})
export class StatisticsModule {}
