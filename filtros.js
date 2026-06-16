let categoriaAtual = "Todos";

function aplicarFiltros() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const resultado = produtos.filter(produto => {

        const nomeCombina =
            produto.nome.toLowerCase().includes(pesquisa);

        const categoriaCombina =
            categoriaAtual === "Todos" ||
            produto.categoria.includes(categoriaAtual);

        return nomeCombina && categoriaCombina;
    });

    produtosFiltrados = resultado;

    renderizarProdutos(produtosFiltrados);
}

document.addEventListener("DOMContentLoaded", () => {

    const pesquisa = document.getElementById("pesquisa");

    if (pesquisa) {

        pesquisa.addEventListener("input", () => {

            aplicarFiltros();

        });

    }

    const filtros = document.querySelectorAll(".filtro-btn");

    filtros.forEach(botao => {

        botao.addEventListener("click", () => {

            filtros.forEach(btn =>
                btn.classList.remove("active")
            );

            botao.classList.add("active");

            categoriaAtual =
                botao.dataset.categoria;

            aplicarFiltros();

        });

    });

});