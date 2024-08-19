import {createContext, ReactNode, useState} from "react";

import UserLogin from "../models/UserLogin";
import { login } from "../services/Service";
import { toastAlerta } from "@/utils/toastAlerta";

interface AuthContextProps {
  user: UserLogin
  handleLogout(): void
  handleLogin(usuario: UserLogin): Promise<void>
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<UserLogin>({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(userLogin: UserLogin) {
      setIsLoading(true)
      try {
          await login(`/usuarios/logar`, userLogin, setUser)
          toastAlerta('Login feito com sucesso', 'sucesso')
          setIsLoading(false)

      } catch (error) {
          console.log(error)
          toastAlerta('Verifique as informações de login', 'info')
          setIsLoading(false)
      }
  }

  function handleLogout() {
      setUser({
          id: 0,
          nome: "",
          usuario: "",
          senha: "",
          foto: "",
          token: ""
      })
  }

  return (
      <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
          {children}
      </AuthContext.Provider>
  )
}