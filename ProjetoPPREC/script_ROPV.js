// Importa as funcionalidades do Vue e Vuetify
const { createApp, ref, computed } = Vue;
const { createVuetify } = Vuetify;

// Cria a instância do Vuetify (estilização e componentes visuais)
const vuetify = createVuetify();

// Cria a aplicação Vue
const app = createApp({
    setup() {
        /**
         * Armazena os dados carregados da planilha.
         * - `data` recebe todos os registros da planilha.
         * - `filteredData` contém os registros filtrados pelo usuário.
         */
    
        const data = ref([]);
        const filteredData = ref([]);
        const displayedFilters = ref({}); // Novo objeto para armazenar os filtros exibidos

        /**
         * Filtros selecionados pelo usuário.
         * - Cada variável reativa armazena as opções selecionadas no <v-select>.
         */
        const selectedAssuntos = ref([]);
        const selectedCategoria = ref([]);
        const selectedComarca = ref([]);
        const selectedDevedor = ref([]);
        const selectedTribunal = ref([]);
        const selectedAno = ref([]);

        /**
         * Opções disponíveis para os filtros.
         * - Preenchido automaticamente ao carregar os dados da planilha.
         * - Armazena valores únicos de cada categoria (Assuntos, Comarca, etc.).
         */
        const options = ref({
            Assuntos: [],
            Categoria: [],
            Comarca: [],
            Devedor: [],
            Tribunal: [],
            Ano: []
        });

        /**
         * Variável para controlar se a consulta já foi realizada.
         */
        const consultaRealizada = ref(false);

        /**
         * Função para carregar os dados do Excel através do backend.
         * - Faz uma requisição à API do backend (`http://localhost:4000/dados`).
         * - Recebe os dados da planilha e preenche `data`.
         * - Preenche automaticamente as opções dos filtros (`options`).
         */
        const loadExcelData = async () => {
            try {
                const response = await fetch("http://localhost:4000/ropv");
                const jsonData = await response.json();

                // Armazena os dados na variável reativa `data`
                data.value = jsonData;

                // Função auxiliar para ordenar arrays alfabeticamente
                const sortAlphabetically = (arr) => arr.sort((a,b) => a.localeCompare(b));

                // Extrai valores únicos para preencher os filtros
                options.value.Assuntos = sortAlphabetically([...new Set(jsonData.map(row => row.Assuntos))]);
                options.value.Categoria = sortAlphabetically([...new Set(jsonData.map(row => row.Categoria))]);
                options.value.Comarca = sortAlphabetically([...new Set(jsonData.map(row => row.Comarca))]);
                options.value.Devedor = sortAlphabetically([...new Set(jsonData.map(row => row.Devedor))]);
                options.value.Tribunal = sortAlphabetically([...new Set(jsonData.map(row => row.Tribunal))]);
                options.value.Ano = sortAlphabetically([...new Set(jsonData.map(row => String(row.Ano)))]); // Convertendo para string

            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
            }
        };

        /**
         * Função para filtrar os dados conforme as seleções do usuário.
         * - Verifica cada linha da planilha e mantém apenas as que atendem aos critérios selecionados.
         * - Se nenhum filtro estiver selecionado, mantém todos os dados.
         */
        const filterData = () => {
            filteredData.value = data.value.filter(row =>
                (selectedAssuntos.value.length === 0 || selectedAssuntos.value.includes(row.Assuntos)) &&
                (selectedCategoria.value.length === 0 || selectedCategoria.value.includes(row.Categoria)) &&
                (selectedComarca.value.length === 0 || selectedComarca.value.includes(row.Comarca)) &&
                (selectedDevedor.value.length === 0 || selectedDevedor.value.includes(row.Devedor)) &&
                (selectedTribunal.value.length === 0 || selectedTribunal.value.includes(row.Tribunal)) &&
                (selectedAno.value.length === 0 || selectedAno.value.includes(String(row.Ano))) // Convertendo para string
            );

            // Recalcula as opções dos filtros com base nos dados filtrados
            options.value.Assuntos = [...new Set(filteredData.value.map(row => row.Assuntos))].sort();
            options.value.Categoria = [...new Set(filteredData.value.map(row => row.Categoria))].sort();
            options.value.Comarca = [...new Set(filteredData.value.map(row => row.Comarca))].sort();
            options.value.Devedor = [...new Set(filteredData.value.map(row => row.Devedor))].sort();
            options.value.Tribunal = [...new Set(filteredData.value.map(row => row.Tribunal))].sort();
            options.value.Ano = [...new Set(filteredData.value.map(row => String(row.Ano)))].sort();

            // Atualiza os filtros exibidos
            displayedFilters.value = {
                Assuntos: selectedAssuntos.value && selectedAssuntos.value.length === 0 ? "Todos" : selectedAssuntos.value.join(", "),
                Categoria: selectedCategoria.value && selectedCategoria.value.length === 0 ? "Todos" : selectedCategoria.value.join(", "),
                Comarca: selectedComarca.value && selectedComarca.value.length === 0 ? "Todos" : selectedComarca.value.join(", "),
                Devedor: selectedDevedor.value && selectedDevedor.value.length === 0 ? "Todos" : selectedDevedor.value.join(", "),
                Tribunal: selectedTribunal.value && selectedTribunal.value.length === 0 ? "Todos" : selectedTribunal.value.join(", "),
                Ano: selectedAno.value && selectedAno.value.length === 0 ? "Todos" : selectedAno.value.join(", ")
            };

            consultaRealizada.value = true; // Define a consulta como realizada
        };

        /**
         * Computed Property para calcular o total dos valores filtrados.
         * - Se nenhum dado for encontrado, retorna "0 reais".
         */
        const calculateTotal = computed(() => {
            const total = filteredData.value.reduce((sum, row) => sum + row.Total, 0);
            return total > 0 ? total : 0; // Se o total for 0, mantém 0
        });

        const formattedFilteredCount = computed(() => {
            const count = filteredData.value.length;
            return new Intl.NumberFormat('pt-BR').format(count);
        });

        /**
         * Função para formatar números no formato de moeda brasileira (R$).
         */
        const formatCurrency = value =>
            new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

        /**
         * Carrega os dados ao iniciar a aplicação.
         * - Assim que o Vue é iniciado, os dados do Excel são carregados automaticamente.
         */
        loadExcelData();

        // Retorna todas as variáveis e funções para serem utilizadas no template Vue
        return {
            selectedAssuntos, selectedCategoria, selectedComarca, selectedDevedor, selectedTribunal, selectedAno,
            options, filteredData, calculateTotal, formatCurrency, filterData, consultaRealizada, displayedFilters, formattedFilteredCount
        };
    }
});

// Associa o Vuetify à aplicação Vue
app.use(vuetify).mount("#app");