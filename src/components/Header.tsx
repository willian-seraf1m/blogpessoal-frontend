import { BookAIcon, User2Icon, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ui/mode-toggle";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { toastAlerta } from "@/utils/toastAlerta";


export default function Header() {
  const navigate = useNavigate()

  const { handleLogout } = useContext(AuthContext)

  function logout() {
      handleLogout()
      navigate('/login')
      toastAlerta('Usuário deslogado com sucesso', 'info')
  }

  return (
    <header className="bg-gray-200 dark:bg-gray-800">
      <div className="max-w-[1000px] mx-auto flex justify-between items-center py-3 px-8">
        <span>
          <Link to="/home" className="flex gap-1"> <BookAIcon/>MyBlog </Link>
        </span>

        <nav className="flex gap-3 items-center">
            <NavLink 
              to={"/home"} 
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400"
                  : "text-gray-700 dark:text-gray-100"
              }
            >
              Posts
            </NavLink>

            <NavLink 
              to={"/themes"} 
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400"
                  : "text-gray-700 dark:text-gray-100"
              }
            >
              Temas
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger className="bg-gray-300 p-1 rounded-full hover:text-indigo-400 transition dark:bg-gray-700"><User2Icon/></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/profile"}><DropdownMenuItem>Perfil</DropdownMenuItem></Link>
                <DropdownMenuItem onClick={logout}>Sair <LogOut size={12} className="ml-1"/></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle/>
        </nav>
      </div>
    </header>
  )
}

