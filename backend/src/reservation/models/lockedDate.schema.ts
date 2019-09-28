import { Document } from 'mongoose';

export interface LockedDate extends Document {
    adminId: string;
    lockedDate: string;
}
