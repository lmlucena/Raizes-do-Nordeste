import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"
import { unidades } from "../data/unidades"
import fundoheader from "../assets/fundoheader.png"

export default function HomePage() {
  const { usuario, selecionarUnidade, unidade } = useApp()
  const navigate = useNavigate()

  function handleSelecionarUnidade(u) {
    selecionarUnidade(u)
    if (usuario) {
      navigate("/cardapio")
    } else {
      navigate("/login")
    }
  }



  return (
    <div>
      <div className=" text-white text-center py-26 px-6" style={{ backgroundImage: `url(${fundoheader})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="text-5xl mb-4">☀️</div>
        <h1 className="text-4xl font-extrabold mb-3">Raízes do Nordeste</h1>
        <p className="text-lg text-gray-300 max-w-lg mx-auto mb-6">A culinária nordestina que conquista todo o Brasil</p>
        <button
          onClick={() => document.getElementById("unidades").scrollIntoView({ behavior: "smooth" })
          } className="bg-[#F5A623] hover:bg-yellow-500 text-white font-bold px-8 py-3 rounded-xl text-lg transition">Ver Cardápio ↓
        </button>
      </div>


      <div className="max-w-5xl mx-auto px-6 py-10">

        {/*   unidades */}
        <div id="unidades">
          <h2 className="text-2xl font-extrabold text-[#1B2A6B] mb-2">📍 Escolha sua unidade</h2>
          <p className="text-gray-500 text-sm mb-6">Selecione a unidade mais próxima para ver o cardápio disponível</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {unidades.map((u) => (
              <div key={u.id} onClick={() => handleSelecionarUnidade(u)} className={`bg-white rounded-xl p-5 cursor-pointer border-2 transition hover:shadow-lg hover:-translate-y-1
                  ${unidade?.id === u.id
                    ? "border-[#F5A623] bg-yellow-50"
                    : "border-transparent hover:border-gray-200"
                  }`}>

                <div className="text-4xl mb-3">{u.emoji}</div>
                <div className="font-bold text-[#1B2A6B] text-sm mb-1">{u.nome}</div>
                <div className="text-xs text-gray-500 mb-3">📍 {u.endereco}</div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${u.aberta ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {u.aberta ? "● Aberta" : "● Fechada"}
                  </span>
                  <span className="text-xs text-gray-400">⏰ {u.horarioAbertura}–{u.horarioFechamento}</span>
                </div>
                {u.cozinhaCompleta
                  ? <span className="mt-2 inline-block text-xs bg-green-50 text-green-700 font-bold px-2 py-1 rounded-full">Cardápio completo</span>
                  : <span className="mt-2 inline-block text-xs bg-gray-100 text-gray-500 font-bold px-2 py-1 rounded-full">Cardápio reduzido</span>
                }{unidade?.id === u.id && (<div className="mt-2 text-xs text-[#F5A623] font-bold">✓ Selecionada</div>)}
              </div>
            ))}
          </div>
        </div>




        <div className="mt-14">
          <h2 className="text-2xl font-extrabold text-[#1B2A6B] mb-6">Como funciona</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🏪", titulo: "Escolha a unidade", desc: "Selecione a loja mais próxima de você" },
              { icon: "🍽️", titulo: "Monte seu pedido", desc: "Veja o cardápio e adicione os itens que quiser" },
              { icon: "🔒", titulo: "Pague com segurança", desc: "PIX, crédito ou débito via gateway seguro" },
              { icon: "⚡", titulo: "Retire na hora", desc: "Seu pedido fica pronto em minutos" },
            ].map((item) => (
              <div key={item.titulo} className="bg-white rounded-xl p-5 text-center shadow-sm">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="font-bold text-[#1B2A6B] text-sm mb-2">{item.titulo}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>


        {/*  fidelidade  */}
        <div className="mt-14 bg-[#A64037] text-white rounded-2xl p-8 text-center">
          <div className="text-3xl font-extrabold mb-2">⭐ Programa de Fidelidade</div>
          <p className="text-gray-300 mb-6">A cada R$ 1,00 gasto você acumula 1 ponto. Troque por produtos grátis!</p>
          <button
            onClick={() => navigate(usuario ? "/fidelidade" : "/login")}
            className="bg-[#F5A623] hover:bg-yellow-500 text-white font-bold px-8 py-3 rounded-xl transition">{usuario ? "Ver meus pontos →" : "Criar conta e começar →"}
          </button>
        </div>


      </div>
    </div>
  )
}