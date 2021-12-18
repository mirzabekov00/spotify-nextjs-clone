import { JWT } from "next-auth/jwt";

type TSessionError = "RefreshAccessTokenError";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: null | string;
    refreshToken: null | string;
    username: null | string;
    accessTokenExpires: null | number;
    iat: null | number;
    exp: null | number;
    jti: null | string;
    error?: TSessionError;
  }
}

declare module "next-auth" {
  interface Session {
    error?: TSessionError;
    user: {
      accessToken: null | string;
      refreshToken: null | string;
      username: null | string;
      email: null | string;
      name: null | string;
      image: null | string;
    };
  }
}
