# Projeto PPREC

Este projeto é uma aplicação web para consulta e filtragem de dados de **Precatórios** e **ROPV**, utilizando **Node.js** no backend e **Vue.js com Vuetify** no frontend. Os dados são lidos de planilhas Excel e exibidos dinamicamente com filtros interativos.

## 📁 Estrutura de Pastas
ProjetoPPREC/
├── backend/ # API Node.js com Express, leitura das planilhas Excel
├── frontend/ # Aplicação Vue.js com Vuetify (interface de usuário)
├── imagens/ # Recursos visuais como logos, ícones, etc.
├── .gitignore # Arquivos/pastas ignorados pelo Git
└── README.md # Este arquivo

## 🚀 Tecnologias Utilizadas

- **Node.js** com **Express** – Backend e API
- **xlsx** – Leitura de planilhas Excel
- **Vue.js** – Framework JavaScript para o frontend
- **Vuetify** – Componentes UI Material Design
- **Live Server** (VS Code) – Visualização local

## 🔧 Funcionalidades

- 📂 Leitura de arquivos Excel (`Precatorios.xlsx` e `ROPV.xlsx`)
- 🔍 Filtros dinâmicos para busca por campos como:
  - Assunto
  - Tribunal
  - Comarca
  - Devedor
  - Ano
- 💰 Cálculo automático de valores filtrados
- 📱 Interface amigável e responsiva

## ▶️ Como Executar o Projeto

### Backend (Node.js)

1. Acesse a pasta `backend`: cd ProjetoPPREC/backend (ou apena cd backend se já estiver em ProjetoPPREC)

2. Instale as dependências: npm install (somente se necessário)

3. Execute o servidor: node server.js 

O backend será iniciado em: http://localhost:4000


### Frontend (Vue.js)

1. Acesse a pasta frontend e abra o arquivo HTML no navegador usando o Live Server do VS Code (ou direto): ProjetoPPREC/frontend/index.html

2. Certifique-se de que o backend esteja rodando antes de usar os filtros, para que os dados sejam carregados corretamente (entre em http://localhost:4000/ropv e http://localhost:4000/precatorios).


📌 Observações
Certifique-se de que os arquivos Excel estejam com os nomes corretos: Precatorios.xlsx e ROPV.xlsx, dentro da pasta backend.

Caso altere os nomes ou a estrutura, atualize o código nos respectivos trechos do backend.

🛠️ Melhorias Futuras
Exportação de resultados filtrados em PDF ou CSV

Autenticação de usuários

Paginação de dados

Integração com banco de dados

👤 Autor
Anderson Haru Arai Matsunaka