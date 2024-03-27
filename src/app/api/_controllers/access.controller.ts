'use strict';

import AccessService from '../_services/access.service';
import { OK, CREATED } from '../_core/success.response';
import { CustomAccessRequest } from '@/types/access';
import { NextRequest } from 'next/server';

class AccessController {
  handlerRefreshToken = async (request: CustomAccessRequest) => {
    return new OK({
      message: 'Get token successfully!',
      metadata: await AccessService.handleRefreshTokenV2({
        refreshToken: request.refreshToken,
        user: request.user,
        keyStore: request.keyStore,
      }),
    });
  };
  logout = async () => {
    return new OK({
      message: 'Logout successfully!',
      metadata: await AccessService.logout(),
    });
  };

  login = async (request: NextRequest) => {
    const payload = await request.json();

    return new OK({
      metadata: await AccessService.login(payload),
      message: 'Login successfully!',
    });
  };

  checkAuth = async () => {
    return new OK({
      metadata: await AccessService.checkAuth(),
      message: 'Check Auth successfully!',
    });
  };
}

const accessController = new AccessController();
export default accessController;
