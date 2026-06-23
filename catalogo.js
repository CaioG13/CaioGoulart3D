let produtos = [];
let produtosFiltrados = [];
let categoriaAtual = "Todos";

function normalizarCategorias(produto) {
    if (Array.isArray(produto.categoria)) {
        return produto.categoria
            .map(categoria => categoria?.toString().trim())
            .filter(Boolean);
    }

    if (typeof produto.categoria === "string") {
        return produto.categoria
            .split(",")
            .map(categoria => categoria.trim())
            .filter(Boolean);
    }

    return [];
}

function renderizarFiltros() {
    const container = document.getElementById("filtros-container");

    if (!container) return;

    const categorias = [...new Set(produtos.flatMap(normalizarCategorias))].sort();

    container.innerHTML = "";

    const criarBotao = (valor, ativo = false) => {
        const botao = document.createElement("button");
        botao.className = `btn btn-outline-dark filtro-btn${ativo ? " active" : ""}`;
        botao.dataset.categoria = valor;
        botao.textContent = valor;
        botao.type = "button";
        return botao;
    };

    container.appendChild(criarBotao("Todos", categoriaAtual === "Todos"));

    categorias.forEach(categoria => {
        container.appendChild(criarBotao(categoria, categoriaAtual === categoria));
    });

    container.querySelectorAll(".filtro-btn").forEach(botao => {
        botao.addEventListener("click", () => {
            categoriaAtual = botao.dataset.categoria;
            aplicarFiltros();
            renderizarFiltros();
        });
    });
}

async function carregarProdutos() {
    try {

        const resposta = await fetch("produtos.json");

        produtos = await resposta.json();

        produtosFiltrados = [...produtos];

        renderizarFiltros();
        renderizarProdutos(produtosFiltrados);

    } catch (erro) {

        console.error("Erro ao carregar produtos:", erro);

        document.getElementById("produtos-container").innerHTML = `
            <div class="col-12 text-center">
                <h4>Erro ao carregar produtos.</h4>
            </div>
        `;
    }
}

function aplicarFiltros() {
    const pesquisa = document
        .getElementById("pesquisa")
        ?.value
        .toLowerCase() || "";

    const resultado = produtos.filter(produto => {
        const categorias = normalizarCategorias(produto);
        const nomeCombina = produto.nome.toLowerCase().includes(pesquisa);
        const categoriaCombina = categoriaAtual === "Todos" || categorias.includes(categoriaAtual);

        return nomeCombina && categoriaCombina;
    });

    produtosFiltrados = resultado;
    renderizarProdutos(produtosFiltrados);
}

function renderizarProdutos(lista) {

    const container = document.getElementById("produtos-container");

    if (!container) return;

    container.innerHTML = "";

    if (lista.length === 0) {

        container.innerHTML = `
            <div class="col-12 text-center">
                <h4>Nenhum produto encontrado.</h4>
            </div>
        `;

        return;
    }

    lista.forEach(produto => {

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        const categorias = normalizarCategorias(produto);

        card.innerHTML = `
            <div class="card h-100 shadow-sm">

                <img
                    src="${produto.imagem || "#"}"
                    class="card-img-top"
                    alt="${produto.nome}"
                >

                <div class="card-body d-flex flex-column">

                    <span class="badge mb-2">
                        ${categorias.join(", ")}
                    </span>

                    <h5 class="card-title">
                        ${produto.nome}
                    </h5>

                    <p class="card-text">
                        ${produto.descricao}
                    </p>

                    <div class="mt-auto">

                        <div class="preco mb-3">
                            R$ ${produto.preco}
                        </div>

                        <a
                            href="${produto.whatsapp || '#'}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-success w-100 mb-2"
                        >
                            Pedir no WhatsApp
                        </a>

                        <button
                            class="btn btn-outline-dark w-100 btn-detalhes"
                            data-id="${produto.id}"
                        >
                            Ver Detalhes
                        </button>

                    </div>

                </div>

            </div>
        `;

        container.appendChild(card);
    });

    ativarEventosDetalhes();
}

function buscarProdutoPorId(id) {

    return produtos.find(
        produto => produto.id == id
    );
}

document.addEventListener("DOMContentLoaded", () => {
    const pesquisa = document.getElementById("pesquisa");

    if (pesquisa) {
        pesquisa.addEventListener("input", aplicarFiltros);
    }

    carregarProdutos();
});