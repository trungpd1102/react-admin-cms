'use server';

import crypto from 'crypto';

import keyTokenService from './keyToken.service';
import {
  authentication,
  createTokenPair,
  getKeyStore,
  getUserIdFromCookies,
} from '../_auth/authUtils';
import {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} from '../_core/error.response';
import userService from './user.service';
import { hashPassword } from '@/utils/password';
import { cookies } from 'next/headers';
import { HEADER } from '@/consts/access';

class AccessService {
  /**
   * Checks this token used
   */
  static handleRefreshTokenV2 = async ({
    refreshToken,
    user,
    keyStore,
  }: {
    refreshToken: string;
    user: CreateTokenPayload;
    keyStore: KeyStore;
  }) => {
    const { userId, email } = user;

    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await keyTokenService.deleteKeyById(userId);
      throw new ForbiddenError('Something went happend!! Pls relogin');
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new AuthFailureError('User not registered');
    }

    const foundUser = await userService.findByEmail({ email });
    if (!foundUser)
      throw new AuthFailureError('User not registered, foundUser');

    // create new token pair
    const tokens = await createTokenPair(
      { userId, email },
      keyStore.publicKey,
      keyStore.privateKey
    );

    //update token
    await keyTokenService.updateKeyById({
      id: keyStore._id,
      oldToken: refreshToken,
      newToken: tokens.refreshToken,
    });

    return {
      user,
      tokens,
    };
  };

  static logout = async () => {
    const cookieStore = cookies();
    const userId = getUserIdFromCookies(cookieStore);
    if (!userId) throw new AuthFailureError('User not found');

    const delKey = await keyTokenService.removeTokenByUserId(userId);

    cookies().delete(HEADER.CLIENT_ID);
    cookies().delete(HEADER.AUTHORIZATION);
    cookies().delete(HEADER.REFRESHTOKEN);

    return delKey;
  };

  /*
		1 - check email in dbs
		2 - match password
		3 - create AccessToken vs RefreshToken and save
		4 - generate tokens
		5 - get data return login
	*/
  static login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    //1.
    const foundUser = await userService.findByUsername({
      username,
    });
    if (!foundUser) throw new BadRequestError('User not registered');
    if (!foundUser.enabled) throw new AuthFailureError('User is locked');

    //2.
    const matchPassword = hashPassword(password) === foundUser.password;
    if (!matchPassword) throw new AuthFailureError('Authentication failed');

    //3.
    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');

    //4.

    const { id: userId } = foundUser;

    const tokens = await createTokenPair(
      { userId, email: foundUser.email },
      publicKey,
      privateKey
    );

    await keyTokenService.createKeyToken({
      userId,
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
    });
    return {
      user: foundUser,
      tokens,
    };
  };

  static checkAuth = async () => {
    return await authentication();
  };
}

export default AccessService;
