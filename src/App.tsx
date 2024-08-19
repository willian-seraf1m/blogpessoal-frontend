import Home from "./pages/Home"
import Login from "./pages/Login";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "@/components/ui/theme-provider"
import { AuthProvider } from './contexts/AuthContext';
import RegisterUser from "./pages/RegisterUser";
import Themes from "./pages/Themes";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<RegisterUser/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/themes" element={<Themes/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
