export default interface encryptRepository {
  encrtpyPassword(password: string): Promise<string>;
  comparePassword(password: string, originalPassword: string): Promise<boolean>;
}
