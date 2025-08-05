// Dependências Utilizadas
    // para instalar as dependências, rode: npm install express cors xlsx
    const express = require("express"); // Framework para criar a API.
    const cors = require("cors"); // Middleware para permitir requisições de outros domínios.
    const xlsx = require("xlsx"); // Biblioteca para manipulação de arquivos Excel.
    const path = require("path"); // Módulo nativo do Node.js para lidar com caminhos de arquivos.

    // Inicialização do Servidor
    const app = express(); // Inicializa o servidor Express.
    const PORT = 4000; // Define a porta onde o servidor rodará.

    app.use(cors()); // Ativa o CORS para permitir requisições de outros domínios.

    // Lista de colunas que queremos manter
    const colunasDesejadas = ["Assuntos", "Categoria", "Comarca", "Devedor", "Tribunal", "Ano", "Total"];

    // Função para ler e formatar dados de uma planilha
    const readAndFormatExcel = (filePath) => {
        try {
            const workbook = xlsx.readFile(filePath); // Lê o arquivo Excel
            const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Pega a primeira aba da planilha
            const jsonData = xlsx.utils.sheet_to_json(sheet); // Converte a aba para JSON

            // Filtrar apenas as colunas desejadas e formatar os dados
            const formattedData = jsonData.map(row => {
                let newRow = {};

                colunasDesejadas.forEach(coluna => {
                    if (row[coluna] !== undefined) {
                        newRow[coluna] = row[coluna]?.toString().trim() || ""; // Remove espaços extras
                    }
                });

                // Conversões específicas para número
                newRow["Ano"] = parseInt(newRow["Ano"]) || 0;
                newRow["Total"] = parseFloat(newRow["Total"]) || 0;

                return newRow;
            });

            return formattedData;
        } catch (error) {
            console.error(`Erro ao carregar a planilha ${filePath}:`, error);
            return null;
        }
    };

    // Endpoint /ropv - Leitura do Arquivo ROPV.xlsx
    app.get("/ropv", (req, res) => {
        const filePath = path.join(__dirname, "ROPV.xlsx"); // Caminho do arquivo ROPV
        const formattedData = readAndFormatExcel(filePath);

        if (formattedData) {
            res.json(formattedData); // Retorna os dados formatados como JSON
        } else {
            res.status(500).json({ error: "Erro ao carregar a planilha ROPV" }); // Retorna erro se algo falhar
        }
    });

    // Endpoint /precatorios - Leitura do Arquivo Precatorio.xlsx
    app.get("/precatorios", (req, res) => {
        const filePath = path.join(__dirname, "Precatorios.xlsx"); // Caminho do arquivo Precatórios
        const formattedData = readAndFormatExcel(filePath);

        if (formattedData) {
            res.json(formattedData); // Retorna os dados formatados como JSON
        } else {
            res.status(500).json({ error: "Erro ao carregar a planilha Precatórios" }); // Retorna erro se algo falhar
        }
    });

    // Inicia o servidor
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });