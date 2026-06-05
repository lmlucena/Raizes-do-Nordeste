import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AppProvider, useApp } from "./context/AppContext"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'
import CardapioPage from './pages/CardapioPage'
import CarrinhoPage from './pages/CarrinhoPage'
import PagamentoPage from './pages/PagamentoPage'
import TotemPage from './pages/TotemPage'
import StatusPage from './pages/StatusPage'
import FidelidadePage from './pages/FidelidadePage'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function RotaPrivada({ children }) {
  const { usuario } = useApp()
  return usuario ? children : <Navigate to="/login" />
}


function AppRoutes() {
  const location = useLocation()
  
  const esconder = [
    "/totem"

  ].includes(location.pathname)

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/cadastro" element={<CadastroPage />}/>
          <Route path="/totem" element={<TotemPage />}/>

          

          {/* rotas privadas só com login */}
          <Route path="/cardapio" element={<RotaPrivada><CardapioPage /></RotaPrivada>}/>
          <Route path="/carrinho" element={<RotaPrivada><CarrinhoPage /></RotaPrivada>}/>
          <Route path="/pagamento" element={<RotaPrivada><PagamentoPage /></RotaPrivada>}/>
          <Route path="/status" element={<RotaPrivada><StatusPage /></RotaPrivada>}/>
          <Route path="/fidelidade" element={<RotaPrivada><FidelidadePage /></RotaPrivada>}/>
        </Routes>
      </div>
      
      {!esconder && <Footer />}

    </>
  )
}
  


export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}