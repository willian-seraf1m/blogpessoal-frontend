import { BookAIcon, User2Icon, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="bg-gray-200">
      <div className="max-w-[1000px] mx-auto flex justify-between items-center py-3 px-8">
        <span><Link to="/home" className="flex gap-1"> <BookAIcon/>MyBlog </Link></span>
        <nav>
          <ul className="flex gap-3 items-center">
            <li>Posts</li>
            <li>Temas</li>
            <li>Criar tema</li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-gray-300 p-1 rounded-full outline-indigo-500"><User2Icon/></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <Link to="/login">
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>Sair <LogOut size={12} className="ml-1"/></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

