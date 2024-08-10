import Home from "./pages/Home"
import Header from "./components/Header"
import Login from "./pages/Login";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProvider from "./contexts/ContextUser";
import { ThemeProvider } from "@/components/theme-provider"
import RegisterUser from "./pages/RegisterUser";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Header/>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<RegisterUser/>}/>
              <Route path="/home" element={<Home/>}/>
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
