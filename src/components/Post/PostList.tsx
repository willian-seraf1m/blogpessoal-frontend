import { useContext, useEffect, useState } from "react";

import Post from "@/models/Post";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { search } from "@/services/Service";
import PostCard from "../Post/PostCard";
import { PostModalForm } from "../Post/PostModalForm";
import { Plus } from "lucide-react";
import { toastAlerta } from "@/utils/toastAlerta";


function CardList() {
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
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
        toastAlerta('O token expirou, favor logar novamente', 'info')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    buscarPostagens();
  }, [posts.length]);

  return (
    <section id="posts" className="max-w-[1000px] mx-auto py-8 px-8">

      <div className="flex justify-between items-center ">
        <h1 className="text-[48px] font-semibold mb-8">Postagens</h1>
        <span className="bg-indigo-500 p-2 flex items-center gap-2 rounded-md">
          <PostModalForm 
            textButton="Novo Post"
            icon={Plus}/>
        </span>
      </div>

      <div id="posts" className="flex gap-3 flex-wrap justify-center">
        {posts.map((post) => {
          return <PostCard key={post.id} post={post}/>
        })}
      </div>

    </section>
  )
}

export default CardList