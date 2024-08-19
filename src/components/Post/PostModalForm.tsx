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
import { toastAlerta } from "@/utils/toastAlerta";
import { DialogDescription } from "@radix-ui/react-dialog";
import { LucideIcon } from "lucide-react"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface postModalFromProps {
  icon: LucideIcon
  textButton?: string
  postID?: number
}

export function PostModalForm({icon: Icon, textButton, postID}: postModalFromProps) {
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
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    searchThemes();
    if (id !== undefined) {
      searchPostByID(id);
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

    if (id != undefined) {
      try {
        await update(`/postagens`, post, setPost, {
          headers: {
            Authorization: token,
          },
        });
        toastAlerta('Post atualizado com sucesso', 'sucesso')
      } catch (error: unknown) {
        if (error instanceof Error && error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao atualizar post', 'erro')
        }
      }
    } else {
      try {
        await register(`/postagens`, post, setPost, {
          headers: {
            Authorization: token,
          },
        });

        toastAlerta('Post criado', 'sucesso')
      } catch (error: unknown) {
        if (error instanceof Error && error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao cadastar post', 'erro')
        }
      }
    }
  }

  const loadingTheme = theme.descricao === '';

  return (
    <Dialog>
      <DialogTrigger>
        <span className="flex gap-2 items-center">
          {textButton}
          {Icon && <Icon />}
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie seu novo post</DialogTitle>
          <DialogDescription>
            Escreva o que você está pensando.
          </DialogDescription>
        </DialogHeader>
        <form 
          onSubmit={generateNewPost}
          action=""
          className="flex flex-col">
          <label htmlFor="">titulo</label>
          <input 
            value={post.titulo}
            type="text" 
            onChange={updateState}
            name="titulo"
            required
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800"/>

          <label htmlFor="">texto</label>
          <input 
            value={post.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            type="text"
            name="texto"
            required
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 h-28"/>

          <label htmlFor="">tema</label>
          <select
            onChange={(e) => searchThemeByID(e.currentTarget.value)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800">
              <option value="">Selecione um tema</option>
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>{theme.descricao}</option>
              ))}
          </select>

          <button disabled={loadingTheme} type="submit" className="flex justify-center bg-indigo-500 p-2 rounded-md mt-4 disabled:bg-indigo-400/80 disabled:cursor-not-allowed">
            {loadingTheme && id !== undefined ? "Editar" : "Cadastrar"}
          </button>
        </form>
      </DialogContent>
    </Dialog>

  )
}