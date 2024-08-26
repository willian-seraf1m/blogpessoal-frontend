import { useContext, useEffect, useState } from "react";

import Post from "@/models/Post";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { search } from "@/services/Service";
import PostCard from "../Post/PostCard";
import { toastAlerta } from "@/utils/toastAlerta";
import { PostModalForm } from "./PostModalForm";
import { Plus } from "lucide-react";


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

  async function searchPostagens() {
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
    searchPostagens();
  }, [posts.length]);

  return (
    <section id="posts" className="max-w-[1000px] mx-auto py-8 px-8">

      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-[48px] font-semibold text-gray-600 dark:text-gray-100">Postagens</h1>
        <span className="bg-indigo-500 p-2 flex items-center gap-2 rounded-md">
          <PostModalForm
            textButton="Novo Post"
            icon={Plus}
            searchPostagens={searchPostagens}
          />
        </span>
      </div>

      <div id="posts" className="flex gap-3 flex-wrap justify-center mt-8">
        {posts.map((post) => {
          return <PostCard 
            key={post.id}
            post={post}
            searchPostagens={searchPostagens}
            />
        })}
      </div>

    </section>
  )
}

export default CardList