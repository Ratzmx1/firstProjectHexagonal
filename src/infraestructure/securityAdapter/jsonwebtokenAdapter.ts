import tokenRepository from "../../domain/repositories/tokenRepository";
import jwt from "jsonwebtoken";

export default class encryptAdapter implements tokenRepository {
  secret: jwt.Secret = process.env.SECRET_KEY || "testingSecretKey";

  generateToken(userId: string): string | null {
    try {
      const tokenConfiguration: jwt.SignOptions = {
        expiresIn: 60 * 60 * 12,
      };
      const tokenData = { userId };
      const token = jwt.sign(tokenData, this.secret, tokenConfiguration);
      return token;
    } catch (error) {
      console.error(error.message);
      throw new Error(`Generate token error: ${error.message}`);
    }
  }

  validateToken(token: string): string | null {
    try {
      const { userId } = jwt.decode(token) as {
        userId: string;
        iat: number;
        exp: number;
      };
      return userId;
    } catch (error) {
      console.error(error.message);
      throw new Error(`Validate token error: ${error.message}`);
    }
  }
}
