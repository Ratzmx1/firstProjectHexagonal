import TokenRepository from "../repositories/tokenRepository";

export default (tokenRepository: TokenRepository) =>
  async (bearer: string): Promise<string | null> => {
    if (!bearer.toUpperCase().startsWith("BEARER ")) {
      return null;
    }
    const token = bearer.split(" ")[1];

    try {
      const userId = await tokenRepository.validateToken(token);
      return userId;
    } catch (error) {
      return null;
    }
  };
