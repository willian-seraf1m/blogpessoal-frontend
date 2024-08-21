import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AuthContext } from "@/contexts/AuthContext";
import Theme from "@/models/Theme";
import { search, update } from "@/services/Service";
import { toastAlerta } from "@/utils/toastAlerta";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Check, Edit2Icon } from "lucide-react"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type editThemeProps = {
  themeID: number
  updateViewItems: () => void
}

export default function EditTheme({themeID, updateViewItems}: editThemeProps) {
  const [tema, setTema] = useState<Theme>({} as Theme);

  const navigate = useNavigate();

  const id = themeID.toString()

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function searchById(id: string) {
    await search(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      searchById(id)
    }
  }, [id])

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value
    })
  }

  async function generateNewTheme(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      try {
        await update(`/temas`, tema, setTema, {
          headers: {
            'Authorization': token
          }
        })
        updateViewItems()
        toastAlerta('Tema atualizado com sucesso', 'sucesso')

      } catch (error: unknown) {
        if (error instanceof Error && error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao atualizar o Tema', 'erro')
        }

      }
    }
  }


  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [token]);

  return (
    <Dialog>
    <DialogTrigger 
    >
      <span className="flex p-2 rounded-md bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
        <Edit2Icon size={22}/>
      </span>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar tema</DialogTitle>
        <DialogDescription>Digite o tema atualizado:</DialogDescription>
      </DialogHeader>

      <form onSubmit={generateNewTheme} className="flex gap-1">
        <input 
          type="text"
          value={tema.descricao}
          name="descricao"
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
          className="w-full p-2 rounded-md dark:bg-gray-800"/>
          <DialogClose type="submit" className="bg-indigo-500 p-2 rounded-md">
            <Check/>
          </DialogClose>
      </form>

    </DialogContent>
  </Dialog>
  )
}