import User from "@/models/User";
import { registerUser } from "@/services/Service";
import { toastAlerta } from "@/utils/toastAlerta";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const navigate = useNavigate()

  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const [usuario, setUser] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  const [userResponse, setUserResponse] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (userResponse.id !== 0) {
      back()
    }
  }, [back, userResponse])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function back() {
    navigate('/login')
  }

  function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value)
  }

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  async function registerNewUser(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmPassword === usuario.senha && usuario.senha.length >= 8) {

      try {
        await registerUser(`/usuarios/cadastrar`, usuario, setUserResponse)
        toastAlerta('Usuário cadastrado com sucesso', 'sucesso')

      } catch (error) {
        toastAlerta('Erro ao cadastrar o Usuário', 'erro')
      }

    } else {
      toastAlerta('Dados inconsistentes. Verifique as informações de cadastro.', 'info')
      setUser({ ...usuario, senha: "" }) 
      setConfirmPassword("")
    }
  }


  return (
    <div className="text-sm bg-gray-200 w-full h-[100vh] flex">
      <div className="hidden bg-gradient-to-r from-violet-500 to-indigo-600 text-gray-100 basis-1/2 text-[48px] font-bold xl:flex justify-center items-center">
        Crie uma conta
      </div>

      <div className="xl:basis-1/2 bg-gray-200 flex justify-center items-center w-full p-4 dark:bg-gray-900">
        <form
          onSubmit={registerNewUser}
          className="bg-gray-300 py-12 px-6 rounded-md flex flex-col w-[480px] dark:bg-gray-800">
          
          <h1 className="text-[32px] font-bold text-center mb-4">Cadastre-se</h1>

          <label htmlFor="nome">Nome</label>
          <input 
            type="text" 
            id="nome"
            name="nome"
            value={usuario.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
          />

          <label htmlFor="usuario">Usuario {"(email)"}</label>
          <input 
            type="text" 
            id="usuario"
            name="usuario"
            value={usuario.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password" 
            name="senha" 
            id="senha" 
            value={usuario.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"/>

          <label htmlFor="confirmPassword">Confirme sua senha</label>
          <input
            type="password" 
            name="confirmPassword" 
            id="confirmPassword" 
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmPassword(e)}
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"/>

          <button type="submit" className="bg-indigo-500 text-gray-100 py-2 px-4 rounded-md my-4">
            Cadastrar
          </button>
          <p className="text-center">Já tem uma conta? <Link to="/login" className="text-indigo-500 dark:text-indigo-400 font-semibold">Faça login</Link></p>
        </form>
      </div>
    </div>
  )
}
