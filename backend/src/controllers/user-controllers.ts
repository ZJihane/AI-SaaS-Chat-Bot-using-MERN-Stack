import {Request, Response, NextFunction } from "express";
import user from "../models/user.js";
import {compare, hash} from 'bcrypt'

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


export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Received request to add a new user");
    const {name, email, password} = req.body;

    const existingUser = await user.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");

    const hashedPassword = await hash(password,10)
    const createdUser = new user({name,email,password:hashedPassword})

    try {
        await createdUser.save()
        return res.status(200).json({ message: 'OK', createdUser });
    } catch (error) {
        console.log("Error in userSignUp:", error);
        return res.status(400).json({ message: 'Error', cause: error.message });
    }
};

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user login
      const { email, password } = req.body;

      const LoggedInUser = await user.findOne({ email });
      if (!LoggedInUser) {
        return res.status(401).send("User not registered");
      }
      const isPasswordCorrect = await compare(password, LoggedInUser.password);
      if (!isPasswordCorrect) {
        return res.status(403).send("Incorrect Password");
      }
      return res
        .status(201)
        .json({ message: "OK", name: LoggedInUser.name, email: LoggedInUser.email });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "ERROR", cause: error.message });
    }
  };
  