import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../generated/prisma";
import { BadRequestError } from "../httpClass/exceptions";
import bcrypt from 'bcrypt';
import { checkUser, generateLoginToken, generateToken, generateUserSession, verifyToken } from "../utils/helperFunction";
import { config } from "../config/envConfig";
import { signUpSchema,loginSchema, userIdSchema, tokenSchema } from "../schema/authSchema";



const prisma = new PrismaClient()


// ====================== CONTROLLERS ====================== //

/**
 * Register a new user.
 */


export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, firstName, lastName, role, password }  = signUpSchema.parse(req.body);
  
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    throw new BadRequestError('User already exists');
  }
  const hashedPassword = await bcrypt.hash( password, 12); 
  const user:any = await prisma.user.create({
    data: { email, firstName, lastName, role, password: hashedPassword, status: 'PENDING', refreshToken: null }
  });

  // const verificationToken = await generateToken(user.id);
  // const verificationLink = `${config.API_CLIENT_URL}/verify/user?token=${verificationToken}`;
  //   // Send verification email
  //   await sendVerificationEmail(
  //   email,
  //   verificationLink,
  //   firstName,
  //   "register"
  // );


  res.status(201).send({
    success: true,
    message: "User created successfully",
  });
};


/**
 * Login user
 */

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) throw new BadRequestError("Invalid Credentials");
  if (user.status === 'SUSPENDED') throw new BadRequestError("Account suspended please contact the Admin");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new BadRequestError("Invalid Credentials");

 


const token = await generateLoginToken(user.id, "8h");
const refreshToken =  await generateLoginToken(user.id, "10h")

  await generateUserSession(user.id,token, refreshToken);

  const { password: _,updatedAt, resetTokenExpiry, ...userData } = user;


  res.status(200).send({
    success: true,
    token,
    refreshToken,
    userData
  });
};
