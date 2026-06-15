let produtos = [];
let produtosFiltrados = [];

async function carregarProdutos() {
    try {

        const resposta = await fetch("produtos.json");

        produtos = await resposta.json();

        produtosFiltrados = [...produtos];

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

function renderizarProdutos(lista) {

    const container = document.getElementById("produtos-container");

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

        card.innerHTML = `
            <div class="card h-100 shadow-sm">

                <img
                    src="${produto.imagem}"
                    class="card-img-top"
                    alt="${produto.nome}"
                >

                <div class="card-body d-flex flex-column">

                    <span class="badge mb-2">
                        ${produto.categoria}
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

                        <button
                            class="btn btn-success w-100 btn-detalhes"
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

carregarProdutos();