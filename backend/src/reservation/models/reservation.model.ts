import { Document } from 'mongoose';

export interface Reservation extends Document {
    adminId: string;
    userId: string;
    reservationDate: string;
    confirmed: boolean;
}
