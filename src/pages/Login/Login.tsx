

export default function Login() {
  return (
    <div className="bg-gray-200 w-full h-[100vh] flex">
      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 text-gray-100 basis-1/2 text-[48px] font-bold flex justify-center items-center">
        Bem Vindo!
      </div>
      <div className="bg-gray-200 flex basis-1/2 flex-col justify-center items-center w-full p-4">
        <div>
          <h1 className="text-[32px] font-bold mb-4">Login</h1>
          <form action="" className="flex flex-col w-[560px]">
            <label htmlFor="">Usuario</label>
            <input type="text" className="mb-4 py-2 px-4 rounded-md"/>
            <label htmlFor="">Senha</label>
            <input type="password" name="" id="" className="mb-4 py-2 px-4 rounded-md" />
            <button className="bg-indigo-500 text-gray-100 py-2 px-4 rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}