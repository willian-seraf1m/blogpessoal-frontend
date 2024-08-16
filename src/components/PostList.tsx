import { useContext, useEffect, useState } from "react";

import Post from "@/models/Post";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { search } from "@/services/Service";
import PostCard from "./PostCard";
import { PostModalForm } from "./PostModalForm";
import { Plus } from "lucide-react";


function CardList() {
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token]);

  async function buscarPostagens() {
    try {
      await search('/postagens', setPosts, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    buscarPostagens();
  }, [posts.length]);

  return (
    <section className="max-w-[1000px] mx-auto py-8 px-8">

      <div className="flex justify-between items-center">
        <h1 className="text-[48px] font-semibold mb-8">Postagens</h1>
        <span className="bg-indigo-500 p-2 flex items-center gap-2 rounded-md">
          Novo post <PostModalForm icon={Plus}/>
        </span>
      </div>

      <div id="posts" className="flex gap-3 flex-wrap">
        {posts.map((post) => (
          <PostCard key={post.id} post={post}/>
        ))}
      </div>

    </section>
  )
}

export default CardList