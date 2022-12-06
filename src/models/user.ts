import { IUser } from '../types/user';
import { model, Schema } from 'mongoose';
import crypto from 'crypto';

const userSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid email address'],
        },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: false, default: false },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpire: {
            type: String,
        },
        skills: {
            type: [String],
            enum: ["software development", "web development", "mobile development", "design", "management", "other"],
            required: false,
        },
        profile: {
            firstName: { type: String, required: false },
            lastName: { type: String, required: false },
            avatar: { type: String, required: false },
            bio: { type: String, required: false },
            phone: { type: String, required: false },
            gender: { type: String, required: false },
            address: {
                street: { type: String, required: false },
                city: { type: String, required: false },
                state: { type: String, required: false },
                country: { type: String, required: false },
                zip: { type: String, required: false },
                location: { type: String, required: false },
            },
            active: { type: Boolean, required: false, default: true },

        },
    },
    {
        timestamps: true,
    }
);


// getResetPasswordToken
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.
        createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
    return resetToken

}


export default model<IUser>('User', userSchema);