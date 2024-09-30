import { Request, Response, NextFunction } from "express";
import user from "../models/user.js";
import { compare, hash } from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

// Get all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Received request for all users");
    try {
        const users = await user.find();
        return res.status(200).json({ message: 'OK', users });
    } catch (error) {
        console.log("Error in getAllUsers:", error);
        return res.status(400).json({ message: 'Error', cause: error.message });
    }
};

// User sign-up
export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Received request to add a new user");
    const { name, email, password } = req.body;

    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) return res.status(401).send("User already registered");

        const hashedPassword = await hash(password, 10);
        const createdUser = new user({ name, email, password: hashedPassword });

        await createdUser.save();

        // Clear existing cookies and set new token cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: 'localhost',
            signed: true,
            path: "/"
        });

        const token = createToken(createdUser._id.toString(), createdUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(200).json({ message: 'OK', createdUser });
    } catch (error) {
        console.log("Error in userSignUp:", error);
        return res.status(400).json({ message: 'Error', cause: error.message });
    }
};

// User login
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const loggedInUser = await user.findOne({ email });
        if (!loggedInUser) return res.status(401).send("User not registered");

        const isPasswordCorrect = await compare(password, loggedInUser.password);
        if (!isPasswordCorrect) return res.status(403).send("Incorrect Password");

        // Clear existing cookies and set new token cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: 'localhost',
            signed: true,
            path: "/"
        });

        const token = createToken(loggedInUser._id.toString(), loggedInUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(201).json({ message: "OK", name: loggedInUser.name, email: loggedInUser.email });
    } catch (error) {
        console.log("Error in userLogin:", error);
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
};
