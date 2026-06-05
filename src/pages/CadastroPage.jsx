import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"

export default function CadastroPage() {
  const { login } = useApp()
  const navigate = useNavigate()

  const [etapa, setEtapa] = useState(1)
  const [carregando, setCarregando] = useState(false)

  // dados pessoais
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [erro, setErro] = useState("")

  // lgpd
  const [aceitouTermos, setAceitouTermos] = useState(false)
  const [aceitouPromocoes, setAceitouPromocoes] = useState(false)
  const [aceitouEmail, setAceitouEmail] = useState(false)


  function handleProximaEtapa(e) {
    e.preventDefault()
    setErro("")

    if (!nome || !email || !telefone || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.")
      return
    }
    if (nome.length < 3) {
      setErro("Nome deve ter pelo menos 3 caracteres.")
      return
    }
    if (senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.")
      return
    }
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.")
      return
    }

    setEtapa(2)
  }


  function handleCriarConta() {
    setCarregando(true)
    setTimeout(() => {
      login({
        nome,
        email,
        pontos: 50,
        nivel: "Bronze",
      })
      navigate("/")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">✨</div>
          <h1 className="text-2xl font-extrabold text-[#1B2A6B]">Criar minha conta</h1>
        </div>

    
        <div className="flex gap-2 mb-2">
          <div className={`flex-1 h-2 rounded-full transition-all ${etapa >= 1 ? "bg-[#1B2A6B]" : "bg-gray-200"}`} />
          <div className={`flex-1 h-2 rounded-full transition-all ${etapa >= 2 ? "bg-[#F5A623]" : "bg-gray-200"}`} />
        </div>
        <p className="text-xs text-gray-400 text-center mb-6">Etapa {etapa} de 2 — {etapa === 1 ? "Dados pessoais" : "Seus dados, suas regras"}</p>

        <div className="bg-white rounded-2xl shadow-md p-8">

          {/* ddados pessoais */}
          {etapa === 1 && (
            <form onSubmit={handleProximaEtapa} className="flex flex-col gap-4">
              {erro && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  ❌ {erro}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">👤 Nome completo</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome completo" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B2A6B] transition"/>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">📧 E-mail</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B2A6B] transition"/>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">📱 Telefone</label>
                <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(XX) XXXXX-XXXX" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B2A6B] transition"/>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">🔒 Senha</label>
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Mínimo 8 caracteres" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B2A6B] transition"/>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">🔒 Confirmar senha</label>
                <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} placeholder="Repita a senha" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B2A6B] transition"/>
              </div>

              <button type="submit" className="bg-[#1B2A6B] hover:bg-blue-900 text-white font-bold py-3 rounded-xl transition">Próximo →
              </button>

            </form>
          )}
  

          {/* LGPD */}
          {etapa === 2 && (
            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="font-bold text-[#1B2A6B] text-sm mb-2">
                  🔐 Lei Geral de Proteção de Dados (LGPD)
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Coletamos seus dados para processar pedidos, gerenciar sua conta e melhorar sua experiência. Você tem direito de acessar, corrigir e solicitar a exclusão dos seus dados a qualquer momento.
                </p>
              </div>

              {/* Checkbox obrigatorio */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={aceitouTermos} onChange={(e) => setAceitouTermos(e.target.checked)} className="mt-1 accent-[#1B2A6B] w-4 h-4 cursor-pointer"/>
                <span className="text-sm text-gray-700 leading-relaxed">Li e aceito a{" "}
                  <span className="text-[#1B2A6B] font-bold underline cursor-pointer">Política de Privacidade</span>{" "} e os Termos de Uso.{" "}
                  <span className="text-red-500 font-bold">(obrigatório)</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={aceitouPromocoes} onChange={(e) => setAceitouPromocoes(e.target.checked)} className="mt-1 accent-[#1B2A6B] w-4 h-4 cursor-pointer"/>
                <span className="text-sm text-gray-700 leading-relaxed">Autorizo o uso dos meus dados para personalização de promoções e campanhas.{" "}
                  <span className="text-gray-400">(opcional)</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={aceitouEmail} onChange={(e) => setAceitouEmail(e.target.checked)} className="mt-1 accent-[#1B2A6B] w-4 h-4 cursor-pointer"/>
                <span className="text-sm text-gray-700 leading-relaxed">Quero receber novidades e ofertas por e-mail e WhatsApp.{" "}
                  <span className="text-gray-400">(opcional)</span>
                </span>
              </label>

              <p className="text-xs text-gray-400">Você pode alterar essas preferências a qualquer momento no seu perfil.</p>

              {/* criar conta */}
              <button onClick={handleCriarConta} disabled={!aceitouTermos || carregando} className="bg-[#F5A623] hover:bg-yellow-500 text-white font-bold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed">
                {carregando ? "Criando conta..." : "✅ Criar minha conta"}
              </button>

              <button onClick={() => setEtapa(1)} className="border-2 border-[#1B2A6B] text-[#1B2A6B] font-bold py-3 rounded-xl hover:bg-blue-50 transition">
                ← Voltar
              </button>

            </div>
          )}



        </div>

        <div className="text-center mt-4 text-sm text-gray-500">Já tem conta?{" "}
          <Link to="/login" className="text-[#1B2A6B] font-bold hover:underline">Entrar</Link>
        </div>


      </div>
    </div>



  )
}