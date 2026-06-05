import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"



export default function CarrinhoPage() {
  const { carrinho, alterarQuantidade, removerDoCarrinho, calcularTotal, calcularPontos, unidade } = useApp()
  const navigate = useNavigate()

  if (carrinho.length === 0) {
    return (
      <div className="text-center mt-[80px]">
        <p className="text-5xl">🛒</p>
        <p className="font-bold text-lg text-gray-600 mt-3">Seu carrinho está vazio</p>
        <p className="text-sm text-gray-400 mt-1">Adicione itens no cardápio primeiro</p>
        <button onClick={() => navigate("/cardapio")} className="mt-5 bg-[#F5A623] text-white font-bold px-6 py-3 rounded-xl">Ver Cardápio
        </button>
      </div>
    )
  }


  return (
    <div className="max-w-4xl mx-auto px-6 py-8 mt-26">
      <h1 className="text-2xl font-bold text-[#1B2A6B] mb-2">🛒 Seu Pedido</h1>

      {unidade && (
        <p className="text-sm text-gray-500 mb-6">📍 {unidade.nome}</p>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4">
            {carrinho.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center text-3xl shrink-0 bg-[#fef3c7]">
                  {item.emoji}
                </div>

                {/* informaçoes  */}
                <div className="flex-1">
                  <p className="font-bold text-sm">{item.nome}</p>
                  <p className="text-xs text-gray-400">R$ {item.preco.toFixed(2)} cada</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => alterarQuantidade(item.id, item.quantidade - 1)} className="w-7 h-7 rounded-full bg-gray-100 font-bold text-sm">−
                    </button>
                    <span className="text-sm font-bold">{item.quantidade}</span>
                    <button onClick={() => alterarQuantidade(item.id, item.quantidade + 1)} className="w-7 h-7 rounded-full bg-[#F5A623] text-white font-bold text-sm"> +
                    </button>
                  </div>
                </div>


                {/* subtotal / remover */}
                <div className="text-right">
                  <p className="font-bold text-green-600 text-sm"> R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  <button onClick={() => removerDoCarrinho(item.id)} className="text-xs text-red-400 mt-2 underline">Remover
                  </button>
                </div>
              </div>
            ))}

            <button onClick={() => navigate("/cardapio")} className="text-sm text-[#1B2A6B] underline text-left">← Continuar comprando
            </button>
          </div>
        </div>

        
        <div className="w-full max-w-[300px]">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="font-bold text-[#1B2A6B] text-base mb-4">Resumo</p>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span>R$ {calcularTotal().toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span className="text-[#F5A623]">⭐ Pontos a ganhar</span>
              <span className="text-[#F5A623]">{calcularPontos()} pts</span>
            </div>

            <hr className="mb-4" />

            <div className="flex justify-between font-bold text-base mb-5">
              <span>Total</span>
              <span className="text-[#1B2A6B]">R$ {calcularTotal().toFixed(2)}</span>
            </div>


            <div className="text-xs text-gray-500 rounded-lg p-3 mb-4 bg-[#f0f7ff]">
              🔒 Pagamento processado por gateway externo seguro
            </div>

            <button onClick={() => navigate("/pagamento")} className="w-full bg-[#F5A623] text-white font-bold py-3 rounded-xl hover:bg-yellow-500 transition">Ir para pagamento →
            </button>
          </div>
        </div>



      </div>
    </div>
  )
}