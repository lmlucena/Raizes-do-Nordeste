import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"

const resgates = [
  { id: 1, pontos: 100, label: "R$ 5,00 de desconto", emoji: "💰" },
  { id: 2, pontos: 200, label: "Tapioca de Frango grátis", emoji: "🫓" },
  { id: 3, pontos: 300, label: "Combo Manhã grátis", emoji: "🌟" },
  { id: 4, pontos: 500, label: "Qualquer item até R$ 15,00", emoji: "🎁" },
]


export default function FidelidadePage() {
  const { usuario, login } = useApp()
  const navigate = useNavigate()

  if (!usuario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <p className="text-6xl">⭐</p>
        <p className="font-bold text-gray-600 mt-3">Faça login para ver seus pontos</p>
        <button onClick={() => navigate("/login")} className="mt-4 bg-[#F5A623] text-white font-bold px-6 py-3 rounded-xl">Entrar
        </button>
      </div>
    )
  }

  const pts = usuario.pontos
  let nivel = "Bronze"
  let proximoNivel = "Prata"
  let metaProximo = 300
  let medalha = "🥉"

  if (pts >= 700) {
    nivel = "Ouro"
    proximoNivel = null
    metaProximo = 700
    medalha = "🥇"
  } else if (pts >= 300) {
    nivel = "Prata"
    proximoNivel = "Ouro"
    metaProximo = 700
    medalha = "🥈"
  }

  const porcentagem = Math.min(100, Math.round((pts / metaProximo) * 100))

  function handleResgatar(resgate) {
    if (usuario.pontos < resgate.pontos) return
    login({ ...usuario, pontos: usuario.pontos - resgate.pontos })
    alert(`✅ Resgate realizado! "${resgate.label}" aplicado no próximo pedido.`)
  }

  return (
    <div className="max-w-lg mx-auto mt-26 px-6 py-8">
      <div className="bg-[#A64037] text-white rounded-2xl p-6 text-center mb-6">
        <p className="text-sm opacity-75 mb-1">Seus pontos</p>
        <p className="text-6xl font-extrabold text-[#F5A623]">{pts}</p>
        <p className="text-sm mt-2">Nível <b>{nivel}</b> {medalha}</p>
        <div className="bg-white bg-opacity-20 rounded-full h-3 mt-4 overflow-hidden">
          <div className="h-3 rounded-full bg-[#F5A623] transition-all" style={{ width: `${porcentagem}%` }}/>
        </div>

        <p className="text-xs opacity-70 mt-2">{proximoNivel ? `${metaProximo - pts} pontos para ${proximoNivel}` : "Nível máximo atingido! 🏆"}</p>
      </div>

      <h2 className="text-lg font-bold text-[#1B2A6B] mb-3">Como ganhar pontos</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: "💳", texto: "A cada R$ 1,00 = 1 ponto" },
          { icon: "📅", texto: "Terças: pontos em dobro" },
          { icon: "🎉", texto: "Primeiro pedido: +50 pts" },
          { icon: "👥", texto: "Indicar amigo: +100 pts" },
        ].map((item) => (
          <div key={item.texto} className="bg-white rounded-xl p-3 flex items-center gap-2 shadow-sm" >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-semibold text-[#1B2A6B]">{item.texto}</span>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-bold text-[#1B2A6B] mb-3">Resgatar pontos</h2>
      <div className="flex flex-col gap-3 mb-6">
        {resgates.map((r) => {
          const temSaldo = pts >= r.pontos
          return (
            <div key={r.id} className={`bg-white rounded-xl p-4 flex items-center justify-between shadow-sm ${!temSaldo ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{r.emoji}</span>
                <div>
                  <p className="font-bold text-sm text-[#1B2A6B]">{r.label}</p>
                  <p className="text-xs text-[#F5A623] font-bold">{r.pontos} pontos</p>
                </div>
              </div>
              <button onClick={() => handleResgatar(r)} disabled={!temSaldo} className={`text-sm font-bold px-4 py-2 rounded-lg transition ${temSaldo ? "bg-[#F5A623] text-white hover:bg-yellow-500": "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>{temSaldo ? "Resgatar" : "Sem saldo"}
              </button>

            </div>
          )
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="font-bold text-[#1B2A6B] text-sm mb-1">🔐 LGPD — Programa de Fidelidade</p>
        <p className="text-xs text-gray-600 leading-relaxed">Os dados de consumo utilizados no programa de fidelidade são tratados conforme a Lei nº 13.709/2018 (LGPD). Você pode cancelar sua participação a qualquer momento nas configurações da sua conta.</p>
      </div>



    </div>
  )
}