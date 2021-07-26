import encryptRepository from "../core/repositories/encryptRepository";
import bcrypt from "bcrypt";

export default class encryptAdapter implements encryptRepository {
  passwordPrivateKey = process.env.PRIVATE_KEY || "this its my key xd";

  async encrtpyPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, this.passwordPrivateKey);
    return hashed;
  }
  async comparePassword(
    password: string,
    originalPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, originalPassword);
  }
}
