import * as mongoose from 'mongoose';

export const AvailabilitySchema = new mongoose.Schema({
    adminId: { type: String },
    userId: { type: String },
    dateStart: { type: String },
    dateEnd: { type: String },
});
