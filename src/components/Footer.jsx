import { useNavigate } from "react-router-dom";


export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="bg-[#A64037] text-white  py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-extrabold text-base">☀️ Raízes do Nordeste</p>
          <p className="text-xs text-gray-400 mt-1">© {new Date().getFullYear()} Leonardo Monteiro. Todos os direitos reservados.</p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-400 text-xs">Acesso interno:</span>
          <button onClick={() => navigate("/totem")} className="bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition">🖥️ Modo Totem
          </button>
        </div>

      </div>
    </footer>
  )
}