import Home from "./pages/Home/Home"
import Header from "./components/Header"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
