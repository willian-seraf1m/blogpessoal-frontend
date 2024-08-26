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
import { toastAlerta } from "@/utils/toastAlerta";

interface deleteActionProps {
  updateViewItems: () => void
  url: string;
  item: Theme | Post;
  text: {
    title: string;
    description: string;
  }
}

export default function DeleteAction({updateViewItems, url, item, text}: deleteActionProps) {
  const { user } = useContext(AuthContext);

  async function deleteItem(id: number) {
    try {
      await deleteItems(url+id, {
          headers: {
              'Authorization': user.token
          }
      })
  
      if(updateViewItems) {
        updateViewItems()
      }
      toastAlerta('Apagado com sucesso', 'sucesso')

  
    } catch (error) {
      toastAlerta('Erro ao excluir', 'erro')

    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger 
        className="bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300 p-2 rounded-md"
      >
          <Trash2Icon size={22} className="hover:text-red-400 transition"/>
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
          <AlertDialogAction onClick={() => deleteItem(item.id)}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
