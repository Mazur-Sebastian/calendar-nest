import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ReservationModule } from './reservation/reservation.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
    imports: [UserModule, AuthModule, ReservationModule, StatisticsModule],
})
export class AppModule {}
