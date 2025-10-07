import { PrismaClient } from "../generated/prisma";
import jwt from "jsonwebtoken"
import { unAuthorizedError } from "../httpClass/exceptions";
import { config } from "../config/envConfig";
import sanitiseHtml from "sanitize-html";


const prisma = new PrismaClient()


export async function checkUser(id:string){
    const user = prisma.user.findUnique({
        where:{id},
    })
return user
}

export const generateToken = async (userId: string) => {
  const token = jwt.sign({ id: userId }, config.AUTH_RESET_TOKEN as string, {expiresIn:'24h'});

  await prisma.user.update({
    where: { id: userId },
    data: { resetToken: token, resetTokenExpiry: new Date(Date.now() + 86400000) }
  });

  return token;
};

export const generateLoginToken = async (userId: string, expiresIn: any ) => {
  return jwt.sign({ id: userId }, config.AUTH_JWT_TOKEN as string, { expiresIn:expiresIn });
};

export const generateUserSession = async (userId: string,sessionToken:string,refreshToken:string) => {
    await prisma.$transaction(async (tx) => {
    // close all active sessions
      tx.user_sessions.updateMany({
       where: {
        userId,
      logoutTime: null,
    },
    data: { logoutTime: new Date() }
  });



  // Store user session
    tx.user_sessions.create({
    data: {
      userId,
      sessionToken,
      refreshToken
    }
  });

    // Update last login
    tx.user.update({
    where: { id: userId },
    data: { 
      lastLogin: new Date(),
      isActive: true
     }
  });

    })

  
};


export async function verifyToken(token: string, type: string) {
    let secret: string;
    if (type === "auth") {
        secret = config.AUTH_JWT_TOKEN as string;
    } else {
        secret = config.AUTH_RESET_TOKEN as string;
    }

    try {
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        return decoded;
    } catch (err) {
        throw new unAuthorizedError("INVALID OR EXPIRED TOKEN");
    }
}

export function sanitizeInput(input: Record<string, any> | string): any {
  if (typeof input === "string") {
    return sanitiseHtml(input, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }

  const sanitized: Record<string, any> = {};
  Object.keys(input).forEach((key) => {
    sanitized[key] = sanitiseHtml(input[key], {
      allowedTags: [],
      allowedAttributes: {},
    });
  });
  return sanitized;
}
