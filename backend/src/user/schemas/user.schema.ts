import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: { type: String },
        username: { type: String },
        isAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);
