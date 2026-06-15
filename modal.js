function ativarEventosDetalhes() {

    const botoes = document.querySelectorAll(".btn-detalhes");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            const id = botao.dataset.id;

            const produto = buscarProdutoPorId(id);

            if (!produto) return;

            document.getElementById("modalTitulo").textContent =
                produto.nome;

            document.getElementById("modalImagem").src =
                produto.imagem;

            document.getElementById("modalDescricao").textContent =
                produto.descricao;

            document.getElementById("modalPreco").textContent =
                `R$ ${produto.preco}`;

            const modal = new bootstrap.Modal(
                document.getElementById("produtoModal")
            );

            modal.show();
        });

    });

}