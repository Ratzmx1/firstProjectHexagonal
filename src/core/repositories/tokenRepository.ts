export default interface TokenI {
  generateToken(userId: string): string | null;
  validateToken(token: string): string | null;
}
