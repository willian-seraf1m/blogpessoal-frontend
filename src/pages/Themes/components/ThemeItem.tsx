import Theme from "@/models/Theme";
import DeleteAction from "../../../components/DeleteAction";
import EditTheme from "./EditTheme";

interface themeItemsProps {
  theme: Theme
  searchThemes: () => void
}

export default function ThemeCard({theme, searchThemes}: themeItemsProps) {
  return (
    <div className="flex-1 min-w-[300px] max-w-80 flex justify-between items-center gap-4 bg-gray-200 py-2 px-4 rounded-md dark:bg-gray-800">
      <div className="text-xl">
        <span className="text-indigo-400 font-semibold">#</span>
        <span className="dark:text-gray-300">{theme.descricao}</span>
      </div>
      <div className="flex gap-2">
        <div className="">
          <EditTheme 
            themeID={theme.id}
            updateViewItems={searchThemes}/>
        </div>

        <DeleteAction 
          updateViewItems={searchThemes}
          url={"/temas/"} 
          item={theme} 
          text={{
            title: "Tem certeza que deseja excluir esse tema?", 
            description: "Ao excluir esse tema, todas os posts relacionados a ele também serão excluidos."
        }}/>
      </div>
    </div>
  )
}
