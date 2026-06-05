import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"


export default function PagamentoPage() {
  const { carrinho, calcularTotal, calcularPontos, finalizarPedido } = useApp()
  const navigate = useNavigate()
  const [metodoPagamento, setMetodoPgm] = useState("pix")
  const [processando, setProcessando] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [pontosGanhos, setPontosGanhos] = useState(0)
  const [numCartao, setNumCartao] = useState("")
  const [nomeCartao, setNomeCartao] = useState("")
  const [validade, setValidade] = useState("")
  const [cvv, setCvv] = useState("")
  


 
  

  function handleConfirmar() {
    setProcessando(true)
    const pontosCalculados = calcularPontos()
    setTimeout(() => {
      const aprovado = Math.random() > 0.2

      if (aprovado) {
        setPontosGanhos(pontosCalculados)
        setResultado("aprovado")
        finalizarPedido()
      } else {
        setResultado("recusado")
      }


      setProcessando(false)
    }, 3000)
  }

  
  if (processando) {
    return (
      <div className="text-center mt-[100px]">
        <p className="text-[60px]">⏳</p>
        <p className="font-bold text-lg text-[#1B2A6B] mt-4">Processando pagamento...</p>
        <p className="text-sm text-gray-400 mt-2">Aguardando confirmação do gateway</p>

      </div>
    )
  }
  if (resultado === "aprovado") {
    return (
      <div className="text-center mt-[80px] p-5">
        <p className="text-[70px]">✅</p>
        <h2 className="text-2xl font-bold text-green-600 mt-3">Pagamento aprovado!</h2>
        <p className="text-gray-500 mt-2">Seu pedido foi confirmado com sucesso</p>

        <div className="rounded-xl p-4 mt-5 mx-auto bg-[#d4edda] max-w-[320px]">
          <p className="font-bold text-green-700">⭐ +{pontosGanhos} pontos ganhos!</p>
          <p className="text-sm text-green-600 mt-1">Creditados na sua conta</p>
        </div>
        <button onClick={() => navigate("/status")} className="mt-6 bg-[#F5A623] text-white font-bold px-8 py-3 rounded-xl" >Acompanhar meu pedido →
        </button>
      </div>
    )
  }  if (resultado === "recusado") {
    if (carrinho.length === 0) {
      return (
        <div className="text-center mt-[80px]">
          <p className="text-[50px]">🛒</p>
          <p className="font-bold text-gray-600 mt-3">Nenhum item no carrinho</p>
          <button onClick={() => navigate("/cardapio")} className="mt-4 bg-[#F5A623] text-white font-bold px-6 py-3 rounded-xl">
            Ver Cardápio
          </button>
        </div>
      )   
    }


    return (
      <div className="text-center mt-[80px] p-[20px]">
        <p className="text-[70px]">❌</p>
        <h2 className="text-2xl font-bold text-red-600 mt-3">Pagamento não aprovado</h2>
        <p className="text-gray-500 mt-2">Verifique os dados do cartão ou tente outra forma de pagamento</p>
        <div className="flex flex-col gap-3 mt-6 mx-auto max-w-[300px]" >
          <button onClick={() => setResultado(null)} className="bg-[#F5A623] text-white font-bold py-3 rounded-xl">Tentar novamente
          </button>
          <button onClick={() => navigate("/carrinho")} className="border-2 border-[#1B2A6B] text-[#1B2A6B] font-bold py-3 rounded-xl"> ← Voltar ao carrinho
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-lg mx-auto px-6 py-8 mt-26">
      <h1 className="text-2xl font-bold text-[#1B2A6B] mb-1">💳 Pagamento</h1>
      <p className="text-sm text-gray-500 mb-6">Total:{" "}
        <span className="font-bold text-[#1B2A6B] text-base">R$ {calcularTotal().toFixed(2)}</span>
      </p>
      <div className="flex flex-col gap-3 mb-6">
        {/* pix */}

        <div onClick={() => setMetodoPgm("pix")} className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${metodoPagamento === "pix" ? "border-[#F5A623] bg-[#fffaf0]" : "border-[#e5e7eb] bg-white"}`}>
          <p className="font-bold text-sm">🏦 PIX</p>
          <p className="text-xs text-gray-400 mt-1">Pague na hora, sem taxas</p>
          {metodoPagamento === "pix" && (
            <div className="mt-3 rounded-lg p-4 text-center bg-[#f9f9f9]">
              <p className="text-[48px]">📱</p>
              <p className="text-xs text-gray-500 mt-2">QR Code gerado — escaneie com seu banco</p>
              <p className="text-xs text-red-400 mt-1">⏱ Expira em 5:00</p>
            </div>
          )}
        </div>

        {/* pgm  no credito */}

        <div onClick={() => setMetodoPgm("credito")} className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${metodoPagamento === "credito" ? "border-[#F5A623] bg-[#fffaf0]" : "border-[#e5e7eb] bg-white"}`}>
          <p className="font-bold text-sm">💳 Cartão de Crédito</p>
          <p className="text-xs text-gray-400 mt-1">Em até 3x sem juros</p>
          {metodoPagamento === "credito" && (
            <div className="mt-3 flex flex-col gap-2">
              <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="Número do cartão" value={numCartao} onChange={(e) => setNumCartao(e.target.value)} />
              <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="Nome no cartão" value={nomeCartao} onChange={(e) => setNomeCartao(e.target.value)} />
              <div className="flex gap-2">
                <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none w-1/2" placeholder="MM/AA" value={validade} onChange={(e) => setValidade(e.target.value)} />
                <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none w-1/2" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
              </div>
            </div>
          )}
        </div>

        {/* pgm debito */}
        <div onClick={() => setMetodoPgm("debito")} className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${metodoPagamento === "debito" ? "border-[#F5A623] bg-[#fffaf0]" : "border-[#e5e7eb] bg-white"}`}>
          <p className="font-bold text-sm">💳 Cartão de Débito</p>
          <p className="text-xs text-gray-400 mt-1">Débito à vista</p>
          {metodoPagamento === "debito" && (
            <div className="mt-3 flex flex-col gap-2">
              <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="Número do cartão" value={numCartao} onChange={(e) => setNumCartao(e.target.value)} />
              <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="Nome no cartão" value={nomeCartao} onChange={(e) => setNomeCartao(e.target.value)} />
              <div className="flex gap-2">
                <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none w-1/2" placeholder="MM/AA" value={validade} onChange={(e) => setValidade(e.target.value)} />
                <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none w-1/2" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
              </div>



            </div>
          )}
        </div>

      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-5">
        <p className="text-xs text-gray-400 font-bold mb-3">RESUMO DO PEDIDO</p>
        {carrinho.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-1">
            <span>{item.quantidade}x {item.nome}</span>
            <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-sm">
          <span>Total</span>
          <span>R$ {calcularTotal().toFixed(2)}</span>
        </div>
        <p className="text-xs mt-2 text-[#F5A623]">⭐ Você vai ganhar {calcularPontos()} pontos!</p>
      </div>


      <button onClick={handleConfirmar} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-base transition">🔒 Confirmar e Pagar
      </button>
      <button onClick={() => navigate("/carrinho")} className="w-full mt-3 text-sm text-gray-400 underline">← Voltar ao carrinho
      </button>
    </div>
  )
}