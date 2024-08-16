import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { deleteItems } from "@/services/Service";
import Theme from "@/models/Theme";
import Post from "@/models/Post";

interface deleteActionProps {
  url: string;
  item: Theme | Post;
  text: {
    title: string;
    description: string;
  }
}

export default function DeleteAction({url, item, text}: deleteActionProps) {
  const { user } = useContext(AuthContext);

  async function deletePostOrTheme(id: number) {
    try {
      await deleteItems(url+id, {
          headers: {
              'Authorization': user.token
          }
      })
  
      alert(' Apagado com sucesso')
  
    } catch (error) {
        alert('Erro ao apagar')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
          <Trash2Icon size={22}/>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {text.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {text.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePostOrTheme(item.id)}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
