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