export type UserInfo = Record<string, any> | null

export interface LoginCredentials {
  [key: string]: any
  password?: string
}

export interface AuthContextType {
  userInfo: UserInfo
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<any>
  logout: () => void
}