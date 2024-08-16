import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AuthContext } from "@/contexts/AuthContext";
import Post from "@/models/Post";
import Theme from "@/models/Theme";
import { register, search, update } from "@/services/Service";
import { LucideIcon } from "lucide-react"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface postModalFromProps {
  icon: LucideIcon
  postID?: number
}

export function PostModalForm({icon: Icon, postID}: postModalFromProps) {
  const navigate = useNavigate();

  const id = postID?.toString();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const [themes, setThemes] = useState<Theme[]>([]);

  const [theme, setTheme] = useState<Theme>({
    id: 0,
    descricao: '',
  });

  const [post, setPost] = useState<Post>({
    id: 0,
    titulo: '',
    texto: '',
    data: '',
    tema: null,
    usuario: null,
  });

  async function searchPostByID(id: string) {
    await search(`/postagens/${id}`, setPost, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function searchThemeByID(id: string) {
    await search(`/temas/${id}`, setTheme, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function searchThemes() {
    await search('/temas', setThemes, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    searchThemes();
    if (id !== undefined) {
      searchPostByID(id);
      console.log(theme);

    }
  }, [id]);

  useEffect(() => {
    setPost({
      ...post,
      tema: theme,
    });
  }, [theme]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      tema: theme,
      usuario: user,
    });
  }

  async function generateNewPost(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ post });

    if (id != undefined) {
      try {
        await update(`/postagens`, post, setPost, {
          headers: {
            Authorization: token,
          },
        });
        alert('Postagem atualizada com sucesso');
      } catch (error: unknown) {
        if (error instanceof Error && error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao atualizar a Postagem');
        }
      }
    } else {
      try {
        await register(`/postagens`, post, setPost, {
          headers: {
            Authorization: token,
          },
        });

        alert('Postagem cadastrada com sucesso');
      } catch (error: unknown) {
        if (error instanceof Error && error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao cadastrar a Postagem');
        }
      }
    }
  }

  const loadingTheme = theme.descricao === '';

  return (
    <Dialog>
      <DialogTrigger>
        <span>
          {Icon && <Icon />}
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie seu novo post</DialogTitle>
        </DialogHeader>
        <form 
          onSubmit={generateNewPost}
          action=""
          className="flex flex-col">
          <label htmlFor="">titulo</label>
          <input 
            type="text" 
            onChange={updateState}
            name="titulo"
            required
            className="p-2 rounded-md bg-gray-800"/>

          <label htmlFor="">texto</label>
          <input 
            value={post.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            name="texto"
            required
            type="text" 
            className="p-2 rounded-md bg-gray-800 h-28"/>

          <label htmlFor="">tema</label>
          <select
            onChange={(e) => searchThemeByID(e.currentTarget.value)}
            className="p-2 rounded-md bg-gray-800">
              <option value="">Selecione um tema</option>
              {themes.map((theme) => (
                <option value={theme.id}>{theme.descricao}</option>
              ))}
          </select>

          <button disabled={loadingTheme} type="submit" className="bg-indigo-500 p-2 rounded-md mt-4">
            {loadingTheme ? <span>Carregando</span> : id !== undefined ? "Editar" : "Cadastrar"}
          </button>
        </form>
      </DialogContent>
    </Dialog>

  )
}