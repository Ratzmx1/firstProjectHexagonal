import encryptRepository from "../../domain/repositories/encryptRepository";
import bcrypt from "bcrypt";

export default class encryptAdapter implements encryptRepository {
  passwordPrivateKey = process.env.PRIVATE_KEY || 2048;

  async encrtpyPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, this.passwordPrivateKey);
    return hashed;
  }

  async comparePassword(
    password: string,
    originalPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, originalPassword);
    } catch (error) {
      throw new Error(`Encrypt database error: ${error.message}`);
    }
  }
}
