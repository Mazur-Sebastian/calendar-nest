import * as mongoose from 'mongoose';

export const ReservationSchema = new mongoose.Schema({
    adminId: { type: String },
    userId: { type: String },
    reservationDate: { type: String },
    confirmed: { type: Boolean, default: false },
});
