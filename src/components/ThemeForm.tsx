import { AuthContext } from "@/contexts/AuthContext";
import Theme from "@/models/Theme";
import { register, search, update } from "@/services/Service";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ThemeForm() {
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

    console.log(JSON.stringify(tema))
  }

  async function generateNewTheme(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      try {
        await update(`/temas`, tema, setTema, {
          headers: {
            'Authorization': token
          }
        })

        alert('Tema atualizado com sucesso')

      } catch (error: unknown) {
        if (error instanceof Error && error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao atualizar o Tema')
        }

      }

    } else {
      try {
        await register(`/temas`, tema, setTema, {
          headers: {
            'Authorization': token
          }
        })

        alert('Tema cadastrado com sucesso')

      } catch (error: unknown) {
        if (error instanceof Error && error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao cadastrado o Tema')
        }
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/login');
    }
  }, [navigate, token]);


  return (
    <form 
    onSubmit={generateNewTheme}
    className="flex max-w-[1000px] mx-auto my-6">
      <input 
        type="text"
        name="descricao"
        value={tema.descricao}
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
        placeholder="Criar novo tema" 
        className="bg-gray-200 w-full p-4 rounded-s-md dark:bg-gray-800"/>
      <button type="submit" className="bg-indigo-500 w-[120px] rounded-e-md">Add tema</button>
    </form>
  )
}