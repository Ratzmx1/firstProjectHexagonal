import tokenRepository from "../../core/repositories/tokenRepository";
import jwt from "jsonwebtoken";

export default class encryptAdapter implements tokenRepository {
  secret: jwt.Secret = process.env.SECRET_KEY || "testingSecretKey";

  async generateToken(userId: string): Promise<string | null> {
    const tokenConfiguration: jwt.SignOptions = {
      expiresIn: 60 * 60 * 12,
    };

    const tokenData = userId;
    try {
      const token = await jwt.sign(tokenData, this.secret, tokenConfiguration);
      return token;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async validateToken(token: string): Promise<string | null> {
    try {
      const decodedtoken = (await jwt.decode(token)) as string;
      return decodedtoken;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
