import { createContext, useContext, useState } from "react"




const AppContext = createContext()

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [unidade, setUnidade] = useState(null)
  const [carrinho, setCarrinho] = useState([])
  const [pedido, setpedido] = useState(null)

  function login(dadosUsuario) {
    setUsuario(dadosUsuario)
  }

  function logout() {
    setUsuario(null)
    setCarrinho([])
  }

  function selecionarUnidade(u) {
    setUnidade(u)
  }

  function adicionarAoCarrinho(produto) {
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

  function removerDoCarrinho(id) {
    setCarrinho((prev) => prev.filter((i) => i.id !== id))
  }

  function alterarQuantidade(id, quantidade) {
    if (quantidade <= 0) {
      removerDoCarrinho(id)
      return
    }
    setCarrinho((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantidade } : i))
    )
  }

  function limparCarrinho() {
    setCarrinho([])
  }


  function finalizarPedido() {
    const pontosGanhos = calcularPontos()

    const pedido = {
      id: Math.floor(Math.random() * 9000) + 1000,
      itens: carrinho,
      total: calcularTotal(),
      pontos: pontosGanhos,
      status: "Recebido",
      data: new Date().toLocaleString("pt-BR"),
    }

    if (usuario) {
      setUsuario({ ...usuario, pontos: usuario.pontos + pontosGanhos })
    }

    setpedido(pedido)
    limparCarrinho()
    return pedido
  }


  function calcularTotal() {
    return carrinho.reduce((soma, i) => soma + i.preco * i.quantidade, 0)
  }
  function calcularPontos() {
    return carrinho.reduce((soma, i) => soma + i.pontos * i.quantidade, 0)
  }

  function calcularItens() {
    return carrinho.reduce((soma, i) => soma + i.quantidade, 0)
  }

  return (
    <AppContext.Provider
      value={{
        usuario,
        unidade,
        carrinho,
        pedido,
        login,
        logout,
        selecionarUnidade,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        limparCarrinho,
        finalizarPedido,
        calcularTotal,
        calcularPontos,
        calcularItens,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}



export function useApp() {
  return useContext(AppContext)
}