import { Connection } from 'mongoose';

import {
    RESERVATION_SCHEMA,
    AVAILABILITY_SCHEMA,
    LOCKED_DATE_SCHEMA,
} from 'src/constants/schemas';
import { ReservationSchema } from './schemas/reservation.schema';
import { AvailabilitySchema } from './schemas/availability.schema';
import { LockedDateSchema } from './schemas/lockedDate.schema';
import { DATABASE_CONNECTION } from 'src/constants/config';

export const reservationProviders = [
    {
        provide: RESERVATION_SCHEMA,
        useFactory: (connection: Connection) =>
            connection.model('reservation', ReservationSchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: AVAILABILITY_SCHEMA,
        useFactory: (connection: Connection) =>
            connection.model('availability', AvailabilitySchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: LOCKED_DATE_SCHEMA,
        useFactory: (connection: Connection) =>
            connection.model('lockedDate', LockedDateSchema),
        inject: [DATABASE_CONNECTION],
    },
];
