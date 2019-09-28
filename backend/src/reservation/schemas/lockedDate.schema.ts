import * as mongoose from 'mongoose';

export const LockedDateSchema = new mongoose.Schema({
    adminId: { type: String },
    lockedDate: { type: String },
});
