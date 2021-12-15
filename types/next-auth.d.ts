import { JWT } from "next-auth/jwt";

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
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: null | string;
      refreshToken: null | string;
      username: null | string;
    };
  }
}
