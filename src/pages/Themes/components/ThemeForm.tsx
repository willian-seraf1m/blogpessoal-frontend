import { AuthContext } from "@/contexts/AuthContext";
import Theme from "@/models/Theme";
import { register, search } from "@/services/Service";
import { toastAlerta } from "@/utils/toastAlerta";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface themeFormProps {
  searchThemes: () => void
}

export default function ThemeForm({searchThemes}: themeFormProps) {
  const [tema, setTema] = useState<Theme>({} as Theme);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function searchById(id: string) {
    await search(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      searchById(id)
    }
  }, [id])

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value
    })
  }

  async function generateNewTheme(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      await register(`/temas`, tema, setTema, {
        headers: {
          'Authorization': token
        }
      })
  
      searchThemes()
      toastAlerta('Tema cadastrado com sucesso','sucesso')

    } catch (error: unknown) {
      if (error instanceof Error && error.toString().includes('403')) {
        toastAlerta('O token expirou, favor logar novamente', 'info')
        handleLogout()
      } else {
        toastAlerta('Erro ao cadastrado o Tema', 'erro')
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [navigate, token]);


  return (
    <form 
    onSubmit={generateNewTheme}
    className="flex gap-1 max-w-[1000px] mx-auto my-6">
      <input 
        type="text"
        name="descricao"
        value={tema.descricao || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
        placeholder="Criar novo tema" 
        className="bg-gray-200 w-full p-4 rounded-md dark:bg-gray-800"/>
      <button type="submit" className="bg-indigo-500 w-[120px] rounded-md">Add tema</button>
    </form>
  )
}