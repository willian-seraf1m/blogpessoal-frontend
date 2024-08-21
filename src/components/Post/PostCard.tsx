import Post from "@/models/Post"
import { User2Icon} from "lucide-react"
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from "date-fns/locale/pt-BR";
import DeleteAction from "../DeleteAction";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PostEditForm } from "./PostEditForm";


interface postCardProps {
  post: Post
  searchPostagens: () => void
}

export default function PostCard({post, searchPostagens}: postCardProps) {
  const publishedDateRelativeToNow = formatDistanceToNow(post.data, {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <div className="bg-indigo-300 border border-indigo-300 rounded-md flex-1 max-w-[400px] min-w-[300px] dark:bg-gray-900 dark:border-gray-700">
      <div className="flex gap-2 justify-between items-center p-3">
        <div className="flex gap-2 items-center">
          <span>
            {post.usuario?.foto
            ? <img src={post.usuario?.foto} className="rounded-full w-[32px] h-[32px] object-cover"/>
            : <User2Icon size={32} className="bg-gray-100 p-1 rounded-full dark:bg-gray-700"/>}
          </span>
          <span className="font-semibold">
            {post.usuario?.nome}
          </span>
        </div>
        <span className="text-sm font-semibold dark:text-gray-400">
         {publishedDateRelativeToNow}
        </span>
      </div>

      <div className="h-48 border-y bg-gray-100 dark:bg-gray-800 overflow-hidden relative dark:border-gray-800">
        <Dialog>
          <DialogTrigger className="cursor-pointer text-start w-full">
          <h2 className="font-bold p-3">
          {post.titulo}
          </h2>
          <p className="px-3 h-[100px]">
            {post.texto}
          </p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">
                {post.titulo}
              </DialogTitle>
              <DialogDescription>
                {post.texto}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div 
          className="bg-gradient-to-t from-indigo-200 to-gray-400/0 p-3 absolute bottom-0 left-0 right-0 dark:bg-gradient-to-t dark:from-gray-900 dark:to-gray-900/0">
        </div>
      </div>
      
      <div className="p-3 flex justify-between items-center">
        <span className="bg-indigo-500 text-gray-100 px-2 py-0 rounded-md inline-block text-sm dark:bg-indigo-500/60">
          #{post.tema?.descricao}
        </span>
        <div className="flex gap-1">
          <span className="flex items-center bg-gray-300 dark:bg-gray-700 p-2 rounded-md">
            <PostEditForm
              postID={post.id}
              searchPostagens={searchPostagens}
            />
          </span>

          <DeleteAction
            url="/postagens/"
            item={post}
            text={{title: "Tem certeza que quer deletar esse post?", description: "Essa ação é permanente!"}}
            updateViewItems={searchPostagens}
          />
        </div>
      </div>
    </div>
  )
}

