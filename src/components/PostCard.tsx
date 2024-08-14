import { User2Icon, Edit2Icon, Trash2Icon} from "lucide-react"

export default function CardPost() {
  return (
    <div className="bg-indigo-300 border border-indigo-300 rounded-md flex-1 max-w-[400px] min-w-[300px] dark:bg-gray-900 dark:border-gray-700">
      <div className="flex gap-2 items-center p-3">
        <span className="bg-gray-100 p-1 rounded-full dark:bg-gray-700"><User2Icon/></span>
        <span>Willian Serafim</span>
      </div>
      <div className="bg-gray-100 p-3 dark:bg-gray-800">
        <h2 className="font-bold">Props e Hooks no React</h2>
        <p className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, soluta sequi?</p>
        <span className="bg-indigo-200 px-2 py-0 rounded-md inline-block text-sm dark:bg-indigo-400/50">
          tema react
        </span>
      </div>
      <div className="p-3 flex justify-between items-center">
        <span>• há 3 dias</span>
        <div>
          <button className="py-1 px-2 bg-gray-100 rounded-md mr-1 hover:text-indigo-500 duration-200 dark:bg-gray-800"><Edit2Icon width={22}/></button>
          <button className="py-1 px-2 bg-gray-100 rounded-md hover:text-red-500 duration-200 dark:bg-gray-800"><Trash2Icon width={22}/></button>
        </div>
      </div>
    </div>
  )
}

