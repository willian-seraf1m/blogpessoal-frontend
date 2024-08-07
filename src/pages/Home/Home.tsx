import Footer from "../../components/Footer"

import Animation from "../../assets/Animation.json";
import Lottie from "lottie-react";
import CardList from "@/components/CardList";

export default function Home() {
  return (
    <div className="bg-red-200">

      <main className="bg-gray-200">
        <section className=" bg-gradient-to-r from-violet-500 to-indigo-500 text-gray-200">
          <div className="max-w-[1000px] px-8 mx-auto flex justify-between items-center h-96">
            <div>
              <h1 className="text-[48px] font-semibold">Olá, seja bem vindo!</h1>
              <p className="text-lg">Expresse aqui as suas ideias</p>
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
