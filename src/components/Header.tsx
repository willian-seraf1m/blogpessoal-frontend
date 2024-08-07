import { BookAIcon, User2Icon } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gray-200">
      <div className="max-w-[1000px] mx-auto flex justify-between items-center py-3 px-8">
        <span className="flex gap-1"><BookAIcon/> MyBlog</span>
        <nav>
          <ul className="flex gap-3 items-center">
            <li>Posts</li>
            <li>Temas</li>
            <li>Criar tema</li>
            <li className="bg-gray-300 p-1 rounded-full"><User2Icon size={22}/></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

