import Footer from "../../components/Footer"

import Animation from "../../assets/Animation.json";
import Lottie from "lottie-react";
import PostList from "@/components/Post/PostList";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Header from "@/components/Header";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Header/>

      <main className="bg-gray-200 dark:bg-gray-800 min-h-[100vh]">
        <section className="bg-gradient-to-r from-violet-500 to-indigo-500 text-gray-200">
          <div className="max-w-[1000px] px-8 mx-auto flex justify-center items-center h-96 md:justify-between">
            <div className="text-center md:text-start">
              <h1 className="text-[48px] font-semibold">
                Olá, {user.nome.split(" ")[0]}
              </h1>
              <p className="text-lg">
                O que você está pensando hoje?
              </p>
              <button className="bg-gradient-to-r from-indigo-800/50 to-indigo-500 py-2 px-5 rounded-md mt-3 border border-gray-300 hover:bg-indigo-400 transition">
                <a href="#posts">Escreva um post</a>
              </button>
            </div>

            <Lottie 
              animationData={Animation} 
              className="w-[420px] hidden md:block"/>
          </div>
        </section>

        <PostList/>

      </main>

      <Footer/>
    </div>
  )
}
