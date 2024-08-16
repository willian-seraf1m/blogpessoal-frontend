import Theme from "./Theme"
import User from "./User"

export default interface Post {
  id: number;
  titulo: string;
  texto: string;
  data: string;
  tema: Theme | null;
  usuario: User | null;
}