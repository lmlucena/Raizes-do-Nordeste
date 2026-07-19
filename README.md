# 🌟 Raízes do Nordeste

Sistema de pedidos online para uma rede de lanchonetes nordestinas, desenvolvido como projeto final do curso de Análise e Desenvolvimento de Sistemas na UNINTER.


## 🔗 Links

- **Site publicado:** https://raizes-do-nordeste-pink.vercel.app/
- **Repositório:** https://github.com/lmlucena/Raizes-do-Nordeste

---

## 📋 Sobre o projeto

A Raízes do Nordeste é uma rede fictícia de lanchonetes nordestinas com unidades em diferentes cidades do Brasil. O sistema foi projetado para oferecer uma experiência de pedidos multicanal — pelo site, pelo celular ou pelo totem de autoatendimento dentro das lojas.

O foco do projeto está na experiência do usuário, na clareza dos fluxos e na conformidade com a LGPD.

---

## ✨ Funcionalidades

- 🏪 Seleção de unidade da rede
- 🔐 Login e cadastro com consentimento LGPD
- 🍽️ Cardápio com filtros por categoria e busca em tempo real
- 🛒 Carrinho com controle de quantidade
- 💳 Simulação de pagamento via gateway externo (PIX, crédito, débito)
- 📦 Acompanhamento de status do pedido em tempo real
- ⭐ Programa de fidelidade com pontos e resgates
- 🖥️ Modo totem para autoatendimento nas lojas

---

## 🚀 Tecnologias

- [React 18](https://react.dev)
- [Tailwind CSS 3](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
- [React Router DOM](https://reactrouter.com)
- Context API para gerenciamento de estado global
- Dados mockados em JavaScript


---

## 📱 Páginas do sistema

| Rota | Descrição |
|------|-----------|
| `/` | Home — seleção de unidade |
| `/login` | Login |
| `/cadastro` | Cadastro com etapas LGPD |
| `/cardapio` | Cardápio com filtros |
| `/carrinho` | Carrinho de compras |
| `/pagamento` | Pagamento simulado |
| `/status` | Status do pedido |
| `/fidelidade` | Programa de fidelidade |
| `/totem` | Modo totem (autoatendimento) |

---

## 🔒 LGPD

O sistema foi desenvolvido com atenção à Lei Geral de Proteção de Dados (Lei nº 13.709/2018):

- Consentimento explícito no cadastro
- Checkboxes opcionais para campanhas e comunicações
- Nenhum dado sensível armazenado no front-end
- Aviso de LGPD na página de fidelidade
