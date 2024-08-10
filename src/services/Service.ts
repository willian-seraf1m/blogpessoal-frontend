/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";

const api = axios.create({
  baseURL: 'https://blogpessoal-7xbn.onrender.com/'
})

export const registerUser = async(url: string, dados: Object, setDados: Function) => {
  const response = await api.post(url, dados)
  setDados(response.data)
}

export const login = async(url: string, dados: Object, setDados: Function) => {
  const response = await api.post(url, dados)
  setDados(response.data)
}

export const search = async(url: string, setDados: Function, header: Object) => {
  const response = await api.get(url, header)
  setDados(response.data)
}

export const register = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const response = await api.post(url, dados, header)
  setDados(response.data)
}

export const update = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const response = await api.put(url, dados, header)
  setDados(response.data)
}

export const deletar = async(url: string, header: Object) => {
  await api.delete(url, header)
}