import { getDate } from './../helpers/getDate';
import {
    Injectable,
    NotAcceptableException,
    ServiceUnavailableException,
    Inject,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { parseISO, areIntervalsOverlapping } from 'date-fns';

import {
    RESERVATION_SCHEMA,
    LOCKED_DATE_SCHEMA,
    AVAILABILITY_SCHEMA,
} from 'src/constants/schemas';
import { Reservation } from './models/reservation.model';
import { DateLockDto } from './dto/dateLock.dto';
import { LockedDate } from './models/lockedDate.schema';
import { Availability } from './models/availability.model';
import { formatDate } from 'src/helpers/formatDate';
import { AvailabilityDto } from './dto/availability.dto';
import { ReservationDto } from './dto/reservation.dto';
import { ConfirmationDto } from './dto/confirmation.dto';

@Injectable()
export class ReservationService {
    constructor(
        @Inject(RESERVATION_SCHEMA)
        private readonly reservationModel: Model<Reservation>,
        @Inject(LOCKED_DATE_SCHEMA)
        private readonly lockedDateModel: Model<LockedDate>,
        @Inject(AVAILABILITY_SCHEMA)
        private readonly availabilityModel: Model<Availability>,
    ) {}

    async dateLock(dateLockData: DateLockDto): Promise<boolean> {
        const lockedDate = formatDate(dateLockData.lockedDate);
        const formatedDateLock = { ...dateLockData, lockedDate };
        const date = await this.lockedDateModel.findOne({
            lockedDate,
        });

        if (date) {
            throw new NotAcceptableException('The date is already blocked.');
        }

        const lockDate = new this.lockedDateModel(formatedDateLock);
        if (!lockDate) {
            throw new ServiceUnavailableException('Date blocking failed');
        }
        lockDate.save();

        return true;
    }

    async setAvailability(availabilityData: AvailabilityDto): Promise<boolean> {
        const { dateStart, dateEnd } = availabilityData;
        const datesAvailabilities = await this.getAvailabilities();
        const onlyDate = getDate(dateStart);

        const availability = datesAvailabilities.find(item =>
            item.dateStart.includes(onlyDate),
        );

        const isDateOverlapped =
            availability &&
            areIntervalsOverlapping(
                {
                    start: parseISO(availability.dateStart),
                    end: parseISO(availability.dateEnd),
                },
                {
                    start: parseISO(dateStart),
                    end: parseISO(dateEnd),
                },
            );

        if (isDateOverlapped) {
            throw new NotAcceptableException('This date is not availability');
        }

        const formatedAvailabilityData = {
            ...availabilityData,
            dateStart: formatDate(dateStart),
            dateEnd: formatDate(dateEnd),
        };
        const lockDate = new this.availabilityModel(formatedAvailabilityData);
        if (!lockDate) {
            throw new ServiceUnavailableException('Date blocking failed');
        }
        lockDate.save();

        return true;
    }

    async setReservation(reservationData: ReservationDto) {
        const reservationDate = formatDate(reservationData.reservationDate);
        const formatedReservationData = { ...reservationData, reservationDate };

        const date = await this.reservationModel.findOne({
            reservationDate,
        });

        if (date) {
            throw new NotAcceptableException('This date is not availability');
        }

        const createdReservation = new this.reservationModel(
            formatedReservationData,
        );
        if (!createdReservation) {
            throw new ServiceUnavailableException('Reservation failed');
        }
        createdReservation.save();

        return true;
    }

    async confirmReservation(confirmation: ConfirmationDto): Promise<boolean> {
        const confirmedReservation = await this.reservationModel.findByIdAndUpdate(
            confirmation.reservationId,
            confirmation.confirmed,
        );

        if (!confirmedReservation) {
            throw new NotAcceptableException('Confirmation failed');
        }

        return true;
    }

    async getUserReservations(userId: string): Promise<Reservation[] | string> {
        const reservations = await this.reservationModel.find({ userId });

        if (!reservations.length) {
            return 'No reservations';
        }

        return reservations;
    }

    async getLockedDates(): Promise<LockedDate[]> {
        return await this.lockedDateModel.find();
    }

    async getReservations(): Promise<Reservation[]> {
        return await this.reservationModel.find();
    }

    async getAvailabilities(): Promise<Availability[]> {
        return await this.availabilityModel.find();
    }
}
