import { BookAIcon, User2Icon, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";


export default function Header() {
  const navigate = useNavigate()

  const { handleLogout } = useContext(AuthContext)

  function logout() {
      handleLogout()
      navigate('/login')
      alert('Usuário deslogado com sucesso')
  }

  return (
    <header className="bg-gray-200 dark:bg-gray-800">
      <div className="max-w-[1000px] mx-auto flex justify-between items-center py-3 px-8">
        <span><Link to="/home" className="flex gap-1"> <BookAIcon/>MyBlog </Link></span>
        <nav>
          <ul className="flex gap-3 items-center">
            <li className="hover:text-indigo-300 transition"><Link to={"/home"}>Posts</Link></li>
            <li className="hover:text-indigo-300"><Link to={"/themes"}>Temas</Link></li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-gray-300 p-1 rounded-full hover:text-indigo-400 transition dark:bg-gray-700"><User2Icon/></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Sair <LogOut size={12} className="ml-1"/></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <ModeToggle/>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

