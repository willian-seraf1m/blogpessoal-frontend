import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthContext } from "@/contexts/AuthContext";
import { toastAlerta } from "@/utils/toastAlerta";
import { User2Icon } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user.token === "") {
            toastAlerta('Você precisa estar logado','info')
            navigate("/login")
        }
    }, [user.token])

  return (
    <div className="bg-gray-100">
      <Header/>
      <div className="h-[88vh] dark:bg-gray-900">
        <div className="h-[100px] w-full bg-indigo-300 mt-[1px] absolute dark:bg-gray-800"></div>
        <section>
          <div className="w-full h-36 flex justify-center relative top-6">
            <span className="w-36 h-36 bg-gray-300 rounded-full overflow-hidden border-2 border-indigo-400">
              {user.foto ? <img src={user.foto}/> : <User2Icon className="text-gray-400 p-4 w-36 h-36"/>}
            </span>
          </div>  

          <div className="text-gray-400 font-semibold flex flex-col text-center mt-9">
            <span>Nome: {user.nome}</span>
            <span>Email: {user.usuario}</span>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  )
}