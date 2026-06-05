import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"
import { produtos } from "../data/cardapio"

export default function CardapioPage() {
  const { unidade, adicionarAoCarrinho, carrinho, alterarQuantidade } = useApp()
  const navigate = useNavigate()

  const [categoria, setCategoria] = useState("Todos")
  const [busca, setBusca] = useState("")

  if (!unidade) {
    return (
      <div className="text-center mt-[80px]">
        <p>Você precisa selecionar uma unidade primeiro!</p>
        <button onClick={() => navigate("/")}>Voltar para o início</button>
      </div>
    )
  }

  let lista = produtos

  if (categoria !== "Todos") {
    lista = lista.filter((p) => p.categoria === categoria)
  }

  if (busca !== "") {
    lista = lista.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase())
    )
  }

  function pegaQtdNoCarrinho(id) {
    const achou = carrinho.find((i) => i.id === id)
    if (achou) return achou.quantidade
    return 0
  }

  const categorias = ["Todos", "Tapiocas", "Cuscuz", "Bolos", "Bebidas", "Junino"]

  return (
    <div className="px-6 py-25 max-w-5xl mx-auto">

      {/* info da unidade */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-[#1B2A6B]">{unidade.emoji} {unidade.nome}</h1>
        <p className="text-sm text-gray-500">Horário: {unidade.horarioAbertura} até {unidade.horarioFechamento}{" — "}
          {unidade.aberta ? (
            <span className="text-green-600 font-bold">Aberta</span>
          ) : (
            <span className="text-red-500 font-bold">Fechada</span>
          )}
        </p>
        <button onClick={() => navigate("/")} className="text-sm text-[#1B2A6B] underline mt-1">Trocar unidade
        </button>
      </div>

      <div className="mb-5 rounded-lg p-4 text-white bg-[#F5A623]"  >
        <p className="font-bold">🎉 Combo Manhã</p>
        <p className="text-sm">Cuscuz + Café por R$ 13,00 — economia de R$ 2,50!</p>
      </div>


      <input type="text" placeholder="Buscar produto..." value={busca} onChange={(e) => setBusca(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm mb-4 focus:outline-none"/>

      <div className="flex gap-2 flex-wrap mb-5">
        {categorias.map((cat) => (
          <button key={cat} onClick={() => setCategoria(cat)} className={`px-3 py-1 rounded-full text-sm font-semibold border transition-colors ${categoria === cat ? "bg-[#F5A623] text-white border-[#F5A623]" : "bg-white text-[#333] border-[#ddd]"}`}>{cat}
          </button>
        ))}
      </div>



      {/* lista de produtos */}
      {lista.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p>Nenhum produto encontrado 😕</p>
          <button onClick={() => { setBusca(""); setCategoria("Todos"); }} className="mt-3 text-sm text-[#1B2A6B] underline">Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lista.map((p) => {
            const qtd = pegaQtdNoCarrinho(p.id)
            return (
              <div key={p.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div
                  className="h-32 flex items-center justify-center text-5xl"
                  className="h-32 flex items-center justify-center text-5xl bg-[#fef3c7]">{p.emoji}
                </div>

                <div className="p-3">
                  <p className="font-bold text-sm text-gray-800">{p.nome}</p>
                  <p className="text-xs text-gray-400 mt-1 mb-2">{p.descricao}</p>

                  {p.vegetariano && (
                    <span className="text-xs text-green-600 font-semibold">🌿 Vegetariano</span>
                  )}

                  {p.sazonal && (
                    <span className="text-xs text-yellow-600 font-semibold ml-2">⭐ Junino</span>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-green-600 font-bold text-sm">R$ {p.preco.toFixed(2)}</p>
                      <p className="text-xs text-orange-400">+{p.pontos} pts</p>
                    </div>


                    {/* botao adicionar ou controle de qtd */}
                    {qtd === 0 ? (
                      <button
                        onClick={() => adicionarAoCarrinho(p)}
                        className="bg-[#F5A623] text-white text-xs font-bold px-3 py-2 rounded-lg">Adicionar
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button onClick={() => alterarQuantidade(p.id, qtd - 1)} className="w-7 h-7 rounded-full bg-gray-200 font-bold text-sm">−
                        </button>
                        <span className="text-sm font-bold">{qtd}</span>
                        <button onClick={() => alterarQuantidade(p.id, qtd + 1)} className="w-7 h-7 rounded-full bg-[#F5A623] text-white font-bold text-sm">+
                        </button>
                      </div>
                    )}
                  </div>


                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}