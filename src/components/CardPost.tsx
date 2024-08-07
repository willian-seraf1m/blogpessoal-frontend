import { User2Icon, Edit2Icon, Trash2Icon} from "lucide-react"

export default function CardPost() {
  return (
    <div className="bg-indigo-300 border-2 border-indigo-300 rounded-md flex-1 max-w-[400px] min-w-[300px]">
      <div className="flex gap-2 items-center p-3">
        <span className="bg-gray-100 p-1 rounded-full"><User2Icon/></span>
        <span>Willian Serafim</span>
      </div>
      <div className="bg-gray-100 p-3">
        <h1 className="font-bold">Props e Hooks no React</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, soluta sequi?</p>
        <span className="bg-indigo-200 px-2 py-0 rounded-md mt-1 inline-block text-sm">react</span>
      </div>
      <div className="p-3 flex justify-between items-center">
        <span>• há 3 dias</span>
        <div>
          <button className="py-1 px-2 bg-gray-100 rounded-md mr-1 hover:text-indigo-500 duration-200"><Edit2Icon width={22}/></button>
          <button className="py-1 px-2 bg-gray-100 rounded-md hover:text-red-500 duration-200"><Trash2Icon width={22}/></button>
        </div>
      </div>
    </div>
  )
}

