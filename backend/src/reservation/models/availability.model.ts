import { Document } from 'mongoose';

export interface Availability extends Document {
    adminId: string;
    dateStart: string;
    dateEnd: string;
    confirmed: boolean;
}
