import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    console.log("Received token:", token);

    const publicKey = process.env.CLERK_JWT_PUBLIC_KEY;
    if (!publicKey) {
      res.status(500).json({ message: "Server error: Missing public key" });
      return;
    }

    // Verify token using Clerk's public key
    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err);
        res.status(401).json({ message: "Invalid or expired token" });
        return;
      }

      if (!decoded || typeof decoded !== "object" || !("sub" in decoded)) {
        res.status(401).json({ message: "Invalid token structure" });
        return;
      }

      // Assign user ID to request object
      req.userId = (decoded as JwtPayload).sub;
      console.log("Authenticated user ID:", req.userId);

      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
}
