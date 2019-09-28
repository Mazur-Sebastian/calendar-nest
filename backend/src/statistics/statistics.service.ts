import { Injectable } from '@nestjs/common';
import { differenceInHours, parseISO, compareAsc } from 'date-fns';

import { Availability } from '../reservation/models/availability.model';
import { LockedDate } from '../reservation/models/lockedDate.schema';
import { Reservation } from '../reservation/models/reservation.model';
import { ReservationService } from 'src/reservation/reservation.service';
import { getDate } from 'src/helpers/getDate';

@Injectable()
export class StatisticsService {
    constructor(private readonly reservationService: ReservationService) {}

    async getReservationStatistics() {
        const allReservation: Reservation[] = await this.reservationService.getReservations();
        const allLockedDate: LockedDate[] = await this.reservationService.getLockedDates();
        const allAvailabilities: Availability[] = await this.reservationService.getAvailabilities();

        let allStatistics = [];
        allAvailabilities.map(availability => {
            const availabilityDate = getDate(availability.dateStart);
            const allHours = differenceInHours(
                parseISO(availability.dateEnd),
                parseISO(availability.dateStart),
            );

            const blockedHours = allLockedDate.filter(({ lockedDate }) =>
                availabilityDate.includes(getDate(lockedDate)),
            ).length;

            const reservations = allReservation.filter(({ reservationDate }) =>
                availabilityDate.includes(getDate(reservationDate)),
            ).length;

            const freeHours = allHours - reservations - blockedHours;
            const statistics = {
                [availabilityDate]: {
                    reservations,
                    freeHours,
                    blockedHours,
                },
            };

            allStatistics = [...allStatistics, statistics];
        });

        const sortedStatisticsByDate = allStatistics.sort((a, b) => {
            return compareAsc(
                parseISO(Object.keys(a)[0]),
                parseISO(Object.keys(b)[0]),
            );
        });

        return sortedStatisticsByDate;
    }
}
