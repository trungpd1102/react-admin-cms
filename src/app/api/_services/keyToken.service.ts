import { prisma } from '@/lib/prisma';
import { KeyTokenPostIF } from '@/types/access';

const keyTokenModel = prisma.keyToken;

class KeyTokenService {
  static async createKeyToken({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }: KeyTokenPostIF) {
    try {
      const data = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      };

      const tokens = await keyTokenModel.upsert({
        where: {
          userId: userId,
        },
        update: data,
        create: { userId, ...data },
      });
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  }

  static async findByUserId(userId: number) {
    return await keyTokenModel.findUnique({ where: { userId } });
  }

  static async removeToken(id: number) {
    return await keyTokenModel.delete({ where: { id } });
  }

  static async removeTokenByUserId(userId: number) {
    return await keyTokenModel.delete({ where: { userId } });
  }

  static async findByRefreshTokenUsed(refreshToken: string) {
    return await keyTokenModel.findUnique({
      where: { refreshToken },
    });
  }

  static async findByRefreshToken(refreshToken: string) {
    return await keyTokenModel.findUnique({ where: { refreshToken } });
  }

  static async deleteKeyById(userId: number) {
    return await keyTokenModel.delete({ where: { userId } });
  }

  static async updateKeyById({
    id,
    oldToken,
    newToken,
  }: {
    id: number;
    oldToken: string;
    newToken: string;
  }) {
    const keyToken = await keyTokenModel.findUnique({ where: { id } });

    let refreshTokensUsed = keyToken?.refreshTokensUsed
      ? JSON.parse(keyToken.refreshTokensUsed.toString())
      : [];

    refreshTokensUsed.push(oldToken);

    return await keyTokenModel.update({
      where: { id },
      data: {
        refreshToken: newToken,
        refreshTokensUsed: refreshTokensUsed,
      },
    });
  }
}

export default KeyTokenService;
