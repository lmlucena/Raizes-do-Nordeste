import { useState, useEffect } from "react"
import { produtos } from "../data/cardapio"


const CATEGORIAS = ["Tapiocas", "Cuscuz", "Bolos", "Bebidas"]

export default function TotemPage() {
  const [tela, setTela] = useState("idle")
  const [categoria, setCategoria] = useState("Tapiocas")
  const [carrinho, setCarrinho] = useState([])
  const [contador, setContador] = useState(10)
  const [numeroPedido, setNumeroPedido] = useState(null)


  useEffect(() => {
  if (tela !== "confirmado") return
  const timer = setTimeout(() => {
    if (contador <= 1) {
      setTela("idle")
      setCarrinho([])
      setContador(10)
    } else {
      setContador((prev) => prev - 1)
    }
  }, 1000)

  return () => clearTimeout(timer)
}, [tela, contador])

  function adicionarIten(produto) {
    setCarrinho((prev) => {
      const existe = prev.find((i) => i.id === produto.id)
      if (existe) {
        return prev.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        )
      }
      return [...prev, { ...produto, quantidade: 1 }]
    })
  }

  function alterarQuant(id, qtd) {
    if (qtd <= 0) {
      setCarrinho((prev) => prev.filter((i) => i.id !== id))
      return
    }
    setCarrinho((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantidade: qtd } : i))
    )
  }
  function calcularTot() {
    return carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0)
  }
  function calcularItens() {
    return carrinho.reduce((s, i) => s + i.quantidade, 0)
  }
  function handleConfirmarPagamento() {
    const num = Math.floor(Math.random() * 900) + 100
    setNumeroPedido(num)
    setTela("confirmado")

    setContador(10)
  }
  const produtosFiltrados = produtos.filter((p) => p.categoria === categoria)
  if (tela === "idle") {
    return (
      <div className="min-h-screen bg-[#2b100d] flex flex-col items-center justify-center text-center px-6">
        <p className="text-8xl mb-6">☀️</p>
        <h1 className="text-4xl font-extrabold text-[#F5A623] mb-3">Raízes do Nordeste</h1>
        <p className="text-gray-400 text-lg mb-10">Faça seu pedido de forma rápida e fácil</p>
        <button onClick={() => setTela("menu")} className="bg-[#F5A623] text-white font-extrabold text-2xl px-12 py-5 rounded-2xl animate-pulse">👆 Toque para começar
        </button>
      </div>
    )
  }

  if (tela === "menu") {
    return (
      <div className="min-h-screen bg-[#2b100d] flex flex-col">

        <div className="bg-[#2b100d] px-6 py-4 pt-26 text-center">
          <p className="text-2xl font-extrabold text-[#F5A623]">☀️ Raízes do Nordeste</p>
          <p className="text-gray-400 text-sm mt-1">Auto-atendimento</p>
        </div>

        <div className="flex gap-3 px-6 py-4 overflow-x-auto">
          {CATEGORIAS.map((cat) => (
            <button key={cat} onClick={() => setCategoria(cat)} className={`px-5 py-3 rounded-xl font-bold text-base whitespace-nowrap transition ${categoria === cat
                  ? "bg-[#F5A623] text-white"
                  : "bg-gray-800 text-gray-300"
                }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* produtos */}
        <div className="flex-1 px-6 pb-28 grid grid-cols-2 gap-4 overflow-y-auto">
          {produtosFiltrados.map((p) => {
            const item = carrinho.find((i) => i.id === p.id)
            const qtd = item ? item.quantidade : 0
            return (
              <div key={p.id} className="bg-[#A64037] rounded-2xl overflow-hidden" >
                <div className="h-28 bg-yellow-100 flex items-center justify-center text-5xl">{p.emoji}
                </div>
                <div className="p-4">
                  <p className="text-white font-bold text-base">{p.nome}</p>
                  <p className="text-xs text-gray-400 mt-1 mb-3">{p.descricao}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[#F5A623] font-extrabold text-lg">R$ {p.preco.toFixed(2)}</p>
                    {qtd === 0 ? (
                      <button onClick={() => adicionarIten(p)}className="bg-[#F5A623] text-white font-bold px-4 py-2 rounded-xl text-base">+ Adicionar
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button onClick={() => alterarQuant(p.id, qtd - 1)} className="w-9 h-9 rounded-full bg-gray-600 text-white font-bold text-lg">−
                        </button>
                        <span className="text-white font-bold text-lg">{qtd}</span>
                        <button onClick={() => alterarQuant(p.id, qtd + 1)} className="w-9 h-9 rounded-full bg-[#F5A623] text-white font-bold text-lg">+
                        </button>
                      </div>
                    )}
                  </div>


                </div>
              </div>
            )
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-[#2b100d] px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">{calcularItens()} itens</p>
            <p className="text-[#F5A623] font-extrabold text-2xl">R$ {calcularTot().toFixed(2)}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setTela("idle"); setCarrinho([]); }} className="bg-gray-700 text-white font-bold px-5 py-3 rounded-xl text-base">Cancelar
            </button>
            <button onClick={() => setTela("resumo")} disabled={carrinho.length === 0} className="bg-[#F5A623] text-white font-bold px-6 py-3 rounded-xl text-base disabled:opacity-40">Finalizar →
            </button>
          </div>
        </div>

      </div>
    )
  }


  if (tela === "resumo") {
    return (
      <div className="min-h-screen bg-[#2b100d] flex flex-col pt-26 px-6 py-8">

        <div className="text-center mb-6">
          <p className="text-2xl font-extrabold text-[#F5A623]">Confirmar Pedido</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {carrinho.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-xl px-5 py-4 flex justify-between items-center">
              <span className="text-white text-base">
                {item.quantidade}x {item.emoji} {item.nome}
              </span>
              <span className="text-[#F5A623] font-extrabold text-base">
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-[#2b100d] rounded-xl px-5 py-4 flex justify-between items-center mb-8">
          <span className="text-white font-bold text-xl">Total</span>
          <span className="text-[#F5A623] font-extrabold text-2xl">R$ {calcularTot().toFixed(2)}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setTela("menu")} className="bg-gray-700 text-white font-bold py-5 rounded-2xl text-lg">← Voltar
          </button>
          <button onClick={() => setTela("pagamento")} className="bg-[#F5A623] text-white font-bold py-5 rounded-2xl text-lg ">💳 Pagar
          </button>
        </div>

      </div>
    )
  }

  if (tela === "pagamento") {
    return (
      <div className="min-h-screen bg-[#2b100d] flex flex-col items-center justify-center text-center px-6">
        <p className="text-7xl mb-6">💳</p>
        <h2 className="text-2xl font-bold text-white mb-2">Aproxime ou insira seu cartão</h2>
        <p className="text-gray-400 mb-10">na maquininha ao lado do totem</p>
        <p className="text-6xl animate-bounce">📲</p>
        <button onClick={handleConfirmarPagamento} className="mt-10 bg-green-600 text-white font-bold px-10 py-5 rounded-2xl text-xl">✅ Simular aprovação
        </button>
        <button onClick={() => setTela("resumo")} className="mt-4 text-gray-400 underline text-sm">← Voltar
        </button>
      </div>
    )
  }

  if (tela === "confirmado") {
    return (
      <div className="min-h-screen bg-[#2b100d] flex flex-col items-center justify-center text-center px-6">
        <p className="text-7xl mb-4">✅</p>
        <h2 className="text-3xl font-extrabold text-[#F5A623] mb-2">Pagamento aprovado!</h2>
        <div className="bg-[#F5A623] rounded-2xl px-12 py-6 my-6">
          <p className="text-white text-sm font-bold opacity-80 mb-1">Seu número de pedido</p>
          <p className="text-white font-extrabold text-7xl">#{numeroPedido}</p>
        </div>


        <p className="text-gray-400 text-lg mb-6">Retire no balcão quando chamado</p>
        <p className="text-[#F5A623] font-bold text-xl">Voltando em {contador}s...</p>
      </div>
    )
  }
}