export default interface TokenI {
  generateToken(userId: string): Promise<string | null>;
  validateToken(token: string): Promise<string | null>;
}
