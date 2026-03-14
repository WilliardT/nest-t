export interface IJwtPayload {
  id: string
}

export interface IAuthTokens {
  accessToken: string
  refreshToken: string
}

export interface IAuthResponse {
  accessToken: string
}
