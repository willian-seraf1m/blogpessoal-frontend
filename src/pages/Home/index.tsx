import Footer from "../../components/Footer"

import Animation from "../../assets/Animation.json";
import Lottie from "lottie-react";
import CardList from "@/components/CardList";
import { useContext } from "react";
import { UserContext } from "@/contexts/ContextUser";

export default function Home() {
  const { nome } = useContext(UserContext);

  return (
    <div>

      <main className="bg-gray-200 dark:bg-gray-800">
        <section className=" bg-gradient-to-r from-violet-500 to-indigo-500 text-gray-200">
          <div className="max-w-[1000px] px-8 mx-auto flex justify-between items-center h-96">
            <div>
              <h1 className="text-[48px] font-semibold">
                Olá, {nome.split(" ")[0]}
              </h1>
              <p className="text-lg">
                O que você está pensando hoje?
              </p>
              <button className="bg-gradient-to-r from-indigo-800/50 to-indigo-500 py-2 px-5 rounded-md mt-3 border border-gray-300 hover:bg-indigo-400 transition">
                Escreva um post
              </button>
            </div>

            <Lottie animationData={Animation} className="w-[420px]"/>
          </div>
        </section>

        <CardList/>

      </main>

      <Footer/>
    </div>
  )
}
