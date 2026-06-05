import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"

const etapas = [
  { label: "Pedido Recebido", icon: "📋", desc: "Seu pedido foi confirmado" },
  { label: "Em Preparo", icon: "👨‍🍳", desc: "A cozinha está preparando" },
  { label: "Pronto para Retirada", icon: "🔔", desc: "Venha retirar no balcão" },
  { label: "Pedido Retirado", icon: "🏠", desc: "Obrigado pela preferência!" },

  
]

export default function StatusPage() {
  const { pedido } = useApp()
  const navigate = useNavigate()
  const [etpAtual, setEtpAtual] = useState(0)

  useEffect(() => {
    if (etpAtual >= etapas.length - 1) return

    const timer = setTimeout(() => {
      setEtpAtual((prev) => prev + 1)
    }, 6000)

    return () => clearTimeout(timer)
  }, [etpAtual])

  if (!pedido) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <p className="text-6xl">📦</p>

        <p className="font-bold text-gray-600 mt-3">Nenhum pedido ativo</p>
        <button onClick={() => navigate("/cardapio")} className="mt-4 bg-[#F5A623] text-white font-bold px-6 py-3 rounded-xl">Fazer um pedido
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-8 mt-26">
      <div className="text-center mb-8">
        <p className="text-5xl">📦</p>
        <h1 className="text-2xl font-bold text-[#1B2A6B] mt-2">Pedido #{pedido.id}</h1>
        <p className="text-sm text-gray-400 mt-1">{pedido.data}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <p className="font-bold text-[#1B2A6B] mb-5">Status do pedido</p>
        <div className="flex flex-col">
          {etapas.map((etapa, index) => {
            const concluida = index < etpAtual
            const atual = index === etpAtual
            const pendente = index > etpAtual

            return (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all ${concluida ? "bg-green-600 text-white" : ""} ${atual ? "bg-[#F5A623] text-white animate-pulse" : ""} ${pendente ? "bg-gray-200 text-gray-400" : ""}`}>
                    {concluida ? "✓" : etapa.icon}
                  </div>

                  {index < etapas.length - 1 && (
                    <div className={`w-0.5 h-10 transition-all ${concluida ? "bg-green-600" : "bg-gray-200"} `}/>
                  )}
                </div>
                <div className="pb-8">
                  <p className={`font-bold text-sm ${pendente ? "text-gray-400" : "text-[#1B2A6B]"}`}>{etapa.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{concluida ? "Concluído" : atual ? etapa.desc : "Aguardando..."}</p>
                </div>

              </div>
            )
          })}
        </div>

        {etpAtual === 2 && (
          <div className="rounded-xl p-4 text-center mt-2 bg-green-100">
            <p className="text-2xl">🔔</p>
            <p className="font-bold text-green-700 text-sm mt-1">Seu pedido está pronto!</p>
            <p className="text-xs text-green-600">Venha retirar no balcão</p>
          </div>
        )}

        {etpAtual === 3 && (
          <div className="rounded-xl p-4 text-center mt-2 bg-blue-100">

            <p className="text-2xl">😊</p>
            <p className="font-bold text-blue-700 text-sm mt-1">Pedido retirado!</p>
            <p className="text-xs text-blue-600">Obrigado pela preferência</p>
          </div>
        )}
      </div>


      <div className="bg-white rounded-xl shadow-sm p-5">
        <p className="text-xs text-gray-400 font-bold mb-3">ITENS DO PEDIDO</p>

        {pedido.itens.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-2">
            <span>{item.quantidade}x {item.emoji} {item.nome}</span>
            <span className="font-semibold">R$ {(item.preco * item.quantidade).toFixed(2)} </span>
          </div>
        ))}

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-sm">
          <span>Total pago</span>
          <span>R$ {pedido.total.toFixed(2)}</span>
        </div>

        <p className="text-xs mt-2 text-[#F5A623]">⭐ +{pedido.pontos} pontos foram creditados!</p>
      </div>

      <button onClick={() => navigate("/")} className="w-full mt-5 border-2 border-[#1B2A6B] text-[#1B2A6B] font-bold py-3 rounded-xl hover:bg-blue-50 transition text-sm">Voltar para o início
      </button>


    </div>
  )
}