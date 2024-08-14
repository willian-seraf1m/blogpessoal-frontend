import { AuthContext } from "@/contexts/AuthContext";
import Theme from "@/models/Theme";
import { deletar } from "@/services/Service";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useContext } from "react";

interface themeCardProps {
  theme: Theme
}

export default function ThemeCard({theme}: themeCardProps) {
  const { user } = useContext(AuthContext);

  async function deleteTheme(id: number) {
    try {
        await deletar(`/temas/${id}`, {
            headers: {
                'Authorization': user.token
            }
        })
  
        alert('Tema apagado com sucesso')
  
    } catch (error) {
        alert('Erro ao apagar o Tema')
    }
  }

  return (
    <div className="flex-1 min-w-[300px] max-w-80 flex justify-between items-center gap-4 bg-gray-200 py-2 px-4 rounded-md dark:bg-gray-800">
      <div className="text-xl">
        <span className="text-indigo-400 font-semibold">#</span>
        <span className="dark:text-gray-300">{theme.descricao}</span>
      </div>
      <div className="flex gap-2">
        <button className="text-gray-400 bg-gray-300 p-2 rounded-full hover:text-indigo-500 dark:bg-gray-900"><Edit2Icon size={16}/></button>
        <button 
        onClick={() => {
          deleteTheme(theme.id)
        }} 
        className="text-gray-400 bg-gray-300 p-2 rounded-full hover:text-red-500 dark:bg-gray-900">
          <Trash2Icon size={16}/>
        </button>
      </div>
    </div>
  )
}
