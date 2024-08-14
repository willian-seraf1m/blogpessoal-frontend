import Home from "./pages/Home"
// import Header from "./components/Header"
import Login from "./pages/Login";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProvider from "./contexts/ContextUser";
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from './contexts/AuthContext';
import RegisterUser from "./pages/RegisterUser";
import Themes from "./pages/Themes";


function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<RegisterUser/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/themes" element={<Themes/>}/>
              </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
