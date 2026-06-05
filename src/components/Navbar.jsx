import { Link, useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"


export default function Navbar() {
  const { usuario, logout, calcularItens, unidade } = useApp()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/")
  }



  return (
    <nav className="fixed top-0 left-0 w-full bg-[#994b37a9] text-white px-6 py-3 flex items-center justify-between z-50 shadow-lg">
      
      <Link to="/" className="flex flex-col">
        <span className="text-xl font-extrabold tracking-tight">☀️ Raízes do Nordeste
        </span>
        {unidade && (
          <span className="text-xs text-yellow-300 font-medium">📍 {unidade.nome}</span>)}
      </Link>


      <div className="flex items-center gap-3">
        {usuario ? (
          <>
            <Link to="/cardapio"className="text-sm font-semibold hover:text-yellow-300 transition">Cardápio</Link>
            <Link to="/fidelidade" className="text-sm font-semibold hover:text-yellow-300 transition">⭐ {usuario.pontos} pts</Link>
            <span className="text-sm text-gray-300 hidden sm:block">Olá, {usuario.nome.split(" ")[0]}</span>

            <button onClick={handleLogout} className="text-sm font-semibold hover:text-red-300 transition">Sair</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-semibold hover:text-yellow-300 transition">Entrar</Link>
            <Link to="/cadastro" className="text-sm font-semibold hover:text-yellow-300 transition">Cadastrar</Link>
          </>
        )}



        {/* Botão */}
        <Link to="/carrinho" className="relative w-full md:w-auto justify-center md:justify-start bg-[#F5A623] hover:bg-yellow-500 transition text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2" >🛒 Carrinho
          {calcularItens() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">{calcularItens()}
            </span>
          )}
        </Link>


      </div>
    </nav>
  )
}