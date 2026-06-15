
const CORES_DISPONIVEIS = [
    { nome: "Branco", cor: "#FFFFFF" },
    { nome: "Preto", cor: "#000000" },
   // { nome: "Cinza", cor: "#808080" },
   // { nome: "Vermelho", cor: "#FF0000" },
   // { nome: "Azul", cor: "#0066FF" },
   // { nome: "Verde", cor: "#00AA00" },
   // { nome: "Amarelo", cor: "#FFD700" },
   // { nome: "Rosa", cor: "#FF69B4" },
   // { nome: "Laranja", cor: "#FF8800" },
   // { nome: "Transparente", cor: "#E0E0E0" }
];

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

            document.getElementById("modalPeso").textContent =
                produto.peso || "-";

            document.getElementById("modalTamanho").textContent =
                produto.tamanho || "-";

            document.getElementById("modalTempo").textContent =
                 produto.tempoImpressao || "-";

                 
                const containerCores =
                    document.getElementById("modalCores");

                containerCores.innerHTML = "";

                CORES_DISPONIVEIS.forEach(corObj => {

                    const quadrado = document.createElement("div");

                    quadrado.className = "cor-item";

                    quadrado.style.backgroundColor = corObj.cor;

                    // nome ao passar o mouse
                    quadrado.title = corObj.nome;

                    containerCores.appendChild(quadrado);
                });




            const modal = new bootstrap.Modal(
                document.getElementById("produtoModal")
            );

            modal.show();
        });

    });

}