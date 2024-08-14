import CardPost from "./PostCard"

import { PlusCircle } from "lucide-react";

function CardList() {
  return (
    <section className="max-w-[1000px] mx-auto py-8 px-8">

      <div className="flex justify-between items-center">
        <h1 className="text-[48px] font-semibold mb-8">Postagens</h1>
        <button className="flex gap-2 items-center bg-indigo-500 py-2 px-3 rounded-md text-xl font-semibold">
          Criar post <PlusCircle size={18}/> 
        </button>
      </div>

      <div id="posts" className="flex gap-3 flex-wrap">
        <CardPost />
        <CardPost />
        <CardPost />
        <CardPost />
        <CardPost />
        <CardPost />
      </div>

    </section>
  )
}

export default CardList