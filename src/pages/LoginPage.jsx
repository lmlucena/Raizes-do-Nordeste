import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"

const USUARIO_MOCK = {
  nome: "Maria das Graças",
  email: "teste@raizes.com",
  senha: "123456",
  pontos: 320,
  nivel: "Prata",
}

export default function LoginPage() {
  const { login } = useApp()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    setErro("")

    if (!email || !senha) {
      setErro("Preencha todos os campos.")
      return
    }

    setCarregando(true)
    setTimeout(() => {
      if (email === USUARIO_MOCK.email && senha === USUARIO_MOCK.senha) {
        login(USUARIO_MOCK)
        navigate("/cardapio")
      } else {
        setErro("E-mail ou senha incorretos. Tente: teste@raizes.com / 123456")
        setCarregando(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">☀️</div>
          <h1 className="text-3xl font-extrabold text-[#1B2A6B]">Raízes do Nordeste</h1>
          <p className="text-gray-500 mt-2">Bem-vindo de volta!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
              ❌ {erro}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">📧 E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B2A6B] transition"/>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">🔒 Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B2A6B] transition"/>
            </div>

            <button type="submit" disabled={carregando} className="bg-[#1B2A6B] hover:bg-blue-900 text-white font-bold py-3 rounded-xl transition disabled:opacity-60">{carregando ? "Entrando..." : "Entrar →"}
            </button>

          </form>

          <div className="bg-blue-50 rounded-lg px-4 py-3 mt-4 text-xs text-gray-500">
            💡 <b>Dica:</b> Use <b>teste@raizes.com</b> e senha <b>123456</b>
          </div>

          <div className="text-center mt-6 text-sm text-gray-500">Não tem conta?{" "}
            <Link to="/cadastro" className="text-[#1B2A6B] font-bold hover:underline">Criar conta grátis</Link>
          </div>

        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-gray-400 hover:text-gray-600">← Voltar para o início</Link>
          
        </div>


      </div>
    </div>
  )
}