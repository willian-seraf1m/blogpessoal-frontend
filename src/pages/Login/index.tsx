import { UserContext } from "@/contexts/ContextUser";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const { nome, setNome } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('/home');
  }

  return (
    <div className="bg-gray-200 w-full h-[100vh] flex">
      <div className="bg-gray-200 flex basis-1/2 flex-col justify-center items-center w-full p-4 dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="bg-gray-300 py-12 px-6 rounded-xl flex flex-col w-[560px] dark:bg-gray-800">
          <h1 className="text-[32px] font-bold text-center mb-4">Login</h1>
          <label htmlFor="usuario">Usuario</label>
          <input 
            type="text" 
            id="usuario"
            name="usuario"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
          />
          <label htmlFor="">Senha</label>
          <input
            type="password" 
            name="" 
            id="" 
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"/>
          <button type="submit" className="bg-indigo-500 text-gray-100 py-2 px-4 rounded-md my-4">
            Login
          </button>
          <p className="text-center">Não tem uma conta? <Link to="/register" className="text-indigo-500 dark:text-indigo-400">Cadastre-se</Link></p>
        </form>
      </div>

      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 text-gray-100 basis-1/2 text-[48px] font-bold flex justify-center items-center">
        Bem Vindo!
      </div>
    </div>
  )
}