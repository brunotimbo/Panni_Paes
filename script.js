// =========================================
// PRODUTOS - SIMULAÇÃO DA BASE DE DADOS
// =========================================

const produtos = [
    {
        id: 1,
        nome: "Pão francês",
        categoria: "Pães",
        preco: 1.00,
        icone: "🥖",
        descricao: "Pão tradicional, crocante por fora e macio por dentro."
    },
    {
        id: 2,
        nome: "Pão de queijo",
        categoria: "Pães",
        preco: 4.50,
        icone: "🧀",
        descricao: "Pão de queijo assado, ideal para acompanhar o café."
    },
    {
        id: 3,
        nome: "Croissant",
        categoria: "Pães",
        preco: 8.00,
        icone: "🥐",
        descricao: "Massa folhada leve e amanteigada."
    },
    {
        id: 4,
        nome: "Coxinha",
        categoria: "Salgados",
        preco: 7.50,
        icone: "🍗",
        descricao: "Salgado recheado com frango temperado."
    },
    {
        id: 5,
        nome: "Empada",
        categoria: "Salgados",
        preco: 7.00,
        icone: "🥧",
        descricao: "Empada assada com recheio de frango."
    },
    {
        id: 6,
        nome: "Queijo",
        categoria: "Frios",
        preco: 6.50,
        icone: "🧀",
        descricao: "Porção de queijo fatiado para o seu pedido."
    },
    {
        id: 7,
        nome: "Presunto",
        categoria: "Frios",
        preco: 5.50,
        icone: "🥓",
        descricao: "Porção de presunto fatiado."
    },
    {
        id: 8,
        nome: "Fatia de bolo",
        categoria: "Doces",
        preco: 9.00,
        icone: "🍰",
        descricao: "Fatia de bolo do dia."
    },
    {
        id: 9,
        nome: "Sonho",
        categoria: "Doces",
        preco: 6.00,
        icone: "🍩",
        descricao: "Massa macia com recheio doce."
    },
    {
        id: 10,
        nome: "Café expresso",
        categoria: "Cafés",
        preco: 5.00,
        icone: "☕",
        descricao: "Café expresso preparado na hora.",
        personalizavel: true
    },
    {
        id: 11,
        nome: "Café com leite",
        categoria: "Cafés",
        preco: 7.00,
        icone: "☕",
        descricao: "Café com leite quente e cremoso.",
        personalizavel: true
    },
    {
        id: 12,
        nome: "Suco de laranja",
        categoria: "Bebidas",
        preco: 8.50,
        icone: "🍊",
        descricao: "Suco de laranja para acompanhar seu lanche."
    },
    {
        id: 13,
        nome: "Água mineral",
        categoria: "Bebidas",
        preco: 4.00,
        icone: "💧",
        descricao: "Garrafa de água mineral."
    }
];


// =========================================
// VARIÁVEIS DO SISTEMA
// =========================================

// O pedido existe somente na memória da sessão.

let pedido = [];

let produtoEmPersonalizacao = null;

let categoriaAtual = "Todos";


// =========================================
// ELEMENTOS DO HTML
// =========================================

const categoriasElemento =
    document.getElementById("categorias");

const listaProdutosElemento =
    document.getElementById("listaProdutos");

const listaPedidoElemento =
    document.getElementById("listaPedido");

const valorTotalElemento =
    document.getElementById("valorTotal");

const btnFinalizar =
    document.getElementById("btnFinalizar");


const modalPersonalizacao =
    document.getElementById("modalPersonalizacao");

const nomeProdutoModal =
    document.getElementById("nomeProdutoModal");

const formPersonalizacao =
    document.getElementById("formPersonalizacao");

const btnFecharModal =
    document.getElementById("btnFecharModal");


const modalConfirmacao =
    document.getElementById("modalConfirmacao");

const btnNovoPedido =
    document.getElementById("btnNovoPedido");


// =========================================
// FUNÇÕES AUXILIARES
// =========================================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


function buscarProduto(id) {

    return produtos.find(function (produto) {
        return produto.id === id;
    });

}


// =========================================
// CATEGORIAS
// =========================================

function renderizarCategorias() {

    const categorias = [
        "Todos",
        ...new Set(
            produtos.map(function (produto) {
                return produto.categoria;
            })
        )
    ];

    categoriasElemento.innerHTML = "";


    categorias.forEach(function (categoria) {

        const botao =
            document.createElement("button");

        botao.type = "button";

        botao.className =
            "categoria-btn";

        botao.textContent =
            categoria;


        if (categoria === categoriaAtual) {

            botao.classList.add("ativa");

        }


        botao.addEventListener(
            "click",
            function () {

                categoriaAtual = categoria;

                renderizarCategorias();

                renderizarProdutos();

            }
        );


        categoriasElemento.appendChild(botao);

    });

}


// =========================================
// PRODUTOS
// =========================================

function renderizarProdutos() {

    listaProdutosElemento.innerHTML = "";


    const produtosFiltrados =
        categoriaAtual === "Todos"

            ? produtos

            : produtos.filter(
                function (produto) {

                    return produto.categoria ===
                        categoriaAtual;

                }
            );


    produtosFiltrados.forEach(
        function (produto) {

            const artigo =
                document.createElement("article");

            artigo.className =
                "produto-card";


            artigo.innerHTML = `

                <div
                    class="produto-imagem"
                    aria-hidden="true"
                >
                    ${produto.icone}
                </div>

                <div class="produto-conteudo">

                    <p class="produto-categoria">
                        ${produto.categoria}
                    </p>

                    <h3>
                        ${produto.nome}
                    </h3>

                    <p class="produto-descricao">
                        ${produto.descricao}
                    </p>

                    <div class="produto-rodape">

                        <span class="produto-preco">

                            ${formatarMoeda(produto.preco)}

                        </span>

                        <button
                            class="produto-adicionar"
                            type="button"
                            data-id="${produto.id}"
                        >
                            Adicionar
                        </button>

                    </div>

                </div>

            `;


            listaProdutosElemento
                .appendChild(artigo);

        }
    );


    const botoesAdicionar =
        document.querySelectorAll(
            ".produto-adicionar"
        );


    botoesAdicionar.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    const id =
                        Number(botao.dataset.id);

                    selecionarProduto(id);

                }
            );

        }
    );

}


// =========================================
// SELEÇÃO DO PRODUTO
// =========================================

function selecionarProduto(id) {

    const produto =
        buscarProduto(id);


    if (!produto) {

        return;

    }


    if (produto.personalizavel) {

        produtoEmPersonalizacao =
            produto;

        nomeProdutoModal.textContent =
            produto.nome;

        formPersonalizacao.reset();

        modalPersonalizacao
            .classList
            .remove("oculto");

        return;

    }


    adicionarAoPedido(produto);

}


// =========================================
// ADICIONAR AO PEDIDO
// =========================================

function adicionarAoPedido(
    produto,
    personalizacao = null
) {

    const chavePersonalizacao =
        personalizacao

            ? `${personalizacao.acucar}|${personalizacao.leite}`

            : "";


    const itemExistente =
        pedido.find(
            function (item) {

                return (
                    item.produto.id === produto.id &&
                    item.chavePersonalizacao ===
                        chavePersonalizacao
                );

            }
        );


    if (itemExistente) {

        itemExistente.quantidade += 1;

    } else {

        pedido.push({

            produto: produto,

            quantidade: 1,

            personalizacao:
                personalizacao,

            chavePersonalizacao:
                chavePersonalizacao

        });

    }


    renderizarPedido();

}


// =========================================
// FORMULÁRIO DE PERSONALIZAÇÃO
// =========================================

formPersonalizacao.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        if (!produtoEmPersonalizacao) {

            return;

        }


        const dados =
            new FormData(
                formPersonalizacao
            );


        const personalizacao = {

            acucar:
                dados.get("acucar"),

            leite:
                dados.get("leite")

        };


        adicionarAoPedido(
            produtoEmPersonalizacao,
            personalizacao
        );


        fecharModalPersonalizacao();


        document
            .getElementById("pedido")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// =========================================
// FECHAR PERSONALIZAÇÃO
// =========================================

function fecharModalPersonalizacao() {

    modalPersonalizacao
        .classList
        .add("oculto");

    produtoEmPersonalizacao = null;

}


btnFecharModal.addEventListener(
    "click",
    fecharModalPersonalizacao
);


modalPersonalizacao.addEventListener(
    "click",
    function (evento) {

        if (
            evento.target ===
            modalPersonalizacao
        ) {

            fecharModalPersonalizacao();

        }

    }
);


// =========================================
// RENDERIZAR PEDIDO
// =========================================

function renderizarPedido() {

    listaPedidoElemento.innerHTML = "";


    if (pedido.length === 0) {

        listaPedidoElemento.innerHTML =
            '<p class="pedido-vazio">Seu pedido ainda está vazio.</p>';


        valorTotalElemento.textContent =
            formatarMoeda(0);


        btnFinalizar.disabled = true;


        return;

    }


    pedido.forEach(
        function (item, indice) {

            const subtotal =
                item.produto.preco *
                item.quantidade;


            const div =
                document.createElement("div");


            div.className =
                "pedido-item";


            let textoPersonalizacao = "";


            if (item.personalizacao) {

                textoPersonalizacao = `

                    <p class="pedido-personalizacao">

                        ${item.personalizacao.acucar}
                        •
                        ${item.personalizacao.leite}

                    </p>

                `;

            }


            div.innerHTML = `

                <div>

                    <h3>
                        ${item.produto.nome}
                    </h3>

                    ${textoPersonalizacao}

                    <div class="pedido-controles">

                        <button
                            type="button"
                            data-acao="diminuir"
                            data-indice="${indice}"
                            aria-label="Diminuir quantidade"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantidade}
                        </span>

                        <button
                            type="button"
                            data-acao="aumentar"
                            data-indice="${indice}"
                            aria-label="Aumentar quantidade"
                        >
                            +
                        </button>

                        <button
                            class="remover-item"
                            type="button"
                            data-acao="remover"
                            data-indice="${indice}"
                        >
                            Remover
                        </button>

                    </div>

                </div>


                <span class="pedido-preco">

                    ${formatarMoeda(subtotal)}

                </span>

            `;


            listaPedidoElemento
                .appendChild(div);

        }
    );


    const total =
        pedido.reduce(
            function (soma, item) {

                return soma +
                    (
                        item.produto.preco *
                        item.quantidade
                    );

            },
            0
        );


    valorTotalElemento.textContent =
        formatarMoeda(total);


    btnFinalizar.disabled = false;

}


// =========================================
// CONTROLES DO PEDIDO
// =========================================

listaPedidoElemento.addEventListener(
    "click",
    function (evento) {

        const botao =
            evento.target.closest(
                "button[data-acao]"
            );


        if (!botao) {

            return;

        }


        const indice =
            Number(botao.dataset.indice);


        const acao =
            botao.dataset.acao;


        if (acao === "aumentar") {

            pedido[indice].quantidade += 1;

        }


        if (acao === "diminuir") {

            pedido[indice].quantidade -= 1;


            if (
                pedido[indice].quantidade <= 0
            ) {

                pedido.splice(indice, 1);

            }

        }


        if (acao === "remover") {

            pedido.splice(indice, 1);

        }


        renderizarPedido();

    }
);


// =========================================
// FINALIZAÇÃO
// =========================================

btnFinalizar.addEventListener(
    "click",
    function () {

        if (pedido.length === 0) {

            return;

        }


        modalConfirmacao
            .classList
            .remove("oculto");

    }
);


// =========================================
// NOVO PEDIDO
// =========================================

btnNovoPedido.addEventListener(
    "click",
    function () {

        pedido = [];


        renderizarPedido();


        modalConfirmacao
            .classList
            .add("oculto");


        document
            .getElementById("cardapio")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// =========================================
// INICIALIZAÇÃO DO SISTEMA
// =========================================

renderizarCategorias();

renderizarProdutos();

renderizarPedido();