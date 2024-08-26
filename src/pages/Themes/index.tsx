import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ThemeForm from "@/pages/Themes/components/ThemeForm";
import ThemeItem from "@/pages/Themes/components/ThemeItem";
import { toastAlerta } from "@/utils/toastAlerta";
import { search } from "@/services/Service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Theme from "@/models/Theme";
import { useNavigate } from "react-router-dom";
import { CopyX } from "lucide-react";

export default function Themes() {
  const [themes, setThemes] = useState<Theme[]>([]);

  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    if (token === '') {
      navigate('/login');
    }
  }, [navigate, token]);

  async function searchThemes() {
    try {
      await search('/temas', setThemes, {
        headers: { Authorization: token },
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.toString().includes('403')) {
        toastAlerta('O token expirou, favor logar novamente', 'info')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    searchThemes()
  }, [handleLogout, themes.length, setThemes, token]);

  return (
    <div className="bg-gray-300 dark:bg-gray-900">
      <Header/>
      <div className="min-h-[100vh] p-4">
        <ThemeForm searchThemes={searchThemes}/>
        
        <section className="max-w-[1000px] mx-auto">
          <h1 className="text-3xl dark:text-gray-200 mb-6">Temas</h1>

          <div className="flex justify-center gap-2 flex-wrap">
            {
              (themes.length == 0) ?
              <div className="flex gap-2 justify-center items-center text-xl text-gray-500 py-6 px-8 border border-gray-700 rounded-md w-full">
                <p>Nenhum tema adicionado</p>
                <CopyX/>
              </div>
              : themes.map((theme) => (
              <ThemeItem
                key={theme.id} 
                theme={theme}
                searchThemes={searchThemes}
              />
            ))}
          </div>
        </section>

      </div>
      <Footer/>
    </div>
  )
}
