import e, { Response, Request } from 'express';

import { IUser } from '../../types/user';
import User from '../../models/user';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let refreshTokens: string[] = [];

const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, 'name' | 'email' | 'password'>;

        if (!(body.name && body.email && body.password)) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        if (body.password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters long' });
            return;
        }

        if (!body.email.includes('@')) {
            res.status(400).json({ message: 'Email must be valid' });
            return;
        }



        // check if user already exists
        const existingUser = await User.findOne({ email: body.email });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const user: IUser = new User({
            name: body.name,
            email: body.email,
            password: hashedPassword,
        });

        const newUser: IUser = await user.save();

        const token = jwt.sign(
            { user_id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '5m' }
        );

        const refreshToken = jwt.sign(
            { user_id: newUser._id, email: newUser.email },
            process.env.JWT_REFRESH_SECRET
        );

        refreshTokens.push(refreshToken);

        res.status(201).json({ token, refreshToken });
    
    } catch (error) {
        throw error;
    }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, 'email' | 'password'>;

        if (!(body.email && body.password)) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }


        // Check if user exists in the database
        const user: IUser | null = await User.findOne({ email: body.email });

        if (user && (await bcrypt.compare(body.password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1m' }
            );

            const refreshToken = jwt.sign(
                { user_id: user._id, email: user.email },
                process.env.JWT_REFRESH_SECRET
            );

            refreshTokens.push(refreshToken);
            console.log(refreshTokens)

            res.status(200).json({ token, refreshToken });
            return;
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
    } catch (error) {
        throw error;
    }
};


const refreshUserToken = async (
    req: Request,
    res: Response
): Promise<e.Response<any, Record<string, any>>> => {
    try {
        const { refresh } = req.body;
        if (!refresh) {
            return res.status(400).send("Refresh token not provided. Please enter one");
        }

        console.log(refreshTokens)
        if (!refreshTokens.includes(refresh)) {
            return res.status(403).send("Refresh Invalid. Please login.");
        }

        const decoded = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);

        if (decoded) {
            const token = jwt.sign(
                { user_id: decoded.user_id, email: decoded.email },
                process.env.JWT_SECRET,
                { expiresIn: '2m' }
            );

            return res.status(200).json({ token });
        } else {
            return res.status(400).send("Invalid Credentials");
        }
    } catch (error) {
        throw error;
    }
};


const UserLogout = async (
    req: Request,
    res: Response
): Promise<e.Response<any, Record<string, any>>> => {
    try {
        const { refresh } = req.body;
        refreshTokens = refreshTokens.filter((token) => refresh !== token); // This will remove the token from the array of refresh tokens using the filter method 

        return res.status(200).send("User logged out successful");
    } catch (error) {
        throw error;
    }
};


export { registerUser, loginUser, refreshUserToken, UserLogout };