import { Module } from '@nestjs/common';

import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

import { UserModule } from './../user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { reservationProviders } from './reservation.providers';

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [ReservationController],
    providers: [ReservationService, ...reservationProviders],
})
export class ReservationModule {}
