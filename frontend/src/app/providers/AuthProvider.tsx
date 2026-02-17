import { createContext, useContext, useEffect, useState, useRef } from "react";
import API from "../../shared/services/api.js";
import type { JSX } from "@emotion/react/jsx-runtime";
import type { UserInfo, LoginCredentials, AuthContextType } from "./providers.types.js";

const AuthContext = createContext<AuthContextType | null>(null)
const REFRESH_URL = "login/refresh/"

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserInfo>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const refreshed = useRef<boolean>(false)

  const fetchUserInfo = async (): Promise<void> => {
    const token = localStorage.getItem("token")
    const refresh = localStorage.getItem("refresh")

    if (!token) {
      setUserInfo(null)
      setLoading(false)
      return;
    }

    try {
      const res = await API.account.get("/user/info/", {
          headers: { Authorization: `Bearer ${token}` }
      });
      setUserInfo(res.data)
      refreshed.current = false
    } catch (err: any) {
      if (err.response?.status === 401 && refresh){
        try {
          refreshed.current = true

          let refresh_response = await API['account'].post(REFRESH_URL, { refresh })
          if (refresh_response) {
            localStorage.setItem("token", refresh_response.data.access);
            await fetchUserInfo();
          }
        }
        catch (err) {
          logout()
        }
      }
      else {
        logout()
      }
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const login = async (credenciais: LoginCredentials): Promise<any> => {
    try {
      const res = await API.account.post('/login/', credenciais)
      localStorage.setItem('token', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      await fetchUserInfo()
      return res.data
    } catch (err) {
      return Promise.reject(err)
    }
  };

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem('refresh')
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
