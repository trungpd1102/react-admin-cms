interface CreateTokenPayload {
  userId: number;
  email: string;
}

interface KeyStore {
  refreshTokensUsed: string[];
  refreshToken: string;
  publicKey: string;
  privateKey: string;
  _id: number;
}
