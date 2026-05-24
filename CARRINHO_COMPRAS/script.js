//Esta atividade precisa de comentários explicando o código

//Array constante com produtos disponíveis
const produtosDisponiveis = [
    {
        id: 1,
        nome: "Pendrive Sandisk 64GB",
        preco: 89.90,
        imagem: "src/cruzerblade.jpg"
    },
    {
        id: 2,
        nome: "HD Externo Toshiba 1TB",
        preco: 579.90,
        imagem: "src/hdexternotoshiba.jpg"
    },
    {
        id: 3,
        nome: "SSD Sata Lexar 240GB",
        preco: 329.90,
        imagem: "src/ssdsatalexar.jpg"
    },
    {
        id: 4,
        nome: "SSD Nvme WD Green 500GB",
        preco: 559.90,
        imagem: "src/ssdwdgreen500.jpg"
    },
    {
        id: 5,
        nome: "Teclado Mecânico PCYES Arkeum",
        preco: 209.90,
        imagem: "src/tecladomecarkeum.jpg"
    },
    {
        id: 6,
        nome: "Headset Gamer A+ Plus Tech Ignite",
        preco: 120.90,
        imagem: "src/headsettechignite.jpg"
    },
    {
        id: 7,
        nome: "Mouse Gamer Fortrek Loyal, 24000 DPI, Wireless",
        preco: 159.90,
        imagem: "src/mousefortrekloyal.jpg"
    },
    {
        id: 8,
        nome: "Memória Ram ADATA Notebook 8GB 3200MHZ, DDR4",
        preco: 509.90,
        imagem: "src/ramnote8gb.jpg"
    },
    {
        id: 9,
        nome: "Webcam TGT HMS480, 480p, USB",
        preco: 21.90,
        imagem: "src/webcamtgthms.jpg"
    }

];

// Array dos produtos no carrinho
let arrayCarrinhoProdutos = []; 

// Declaração de contantes. Classes ou ids puxadas do html
const listaProdutosDiv = document.querySelector(".listProd"); //Lista de produtos
const tabelaItens = document.querySelector("#tabelaItensCompra"); //Tabela de itens do carrinho
const totalTexto = document.querySelector(".total"); //Texto do valor total da compra
const avisoCarrinho = document.querySelector(".avisoCarrinho"); //Aviso do carrinho de compra
const seletorFiltro = document.getElementById("filtroPreco"); //Seletor do filtro de produtos

// Lista produtos do array javascript no html
function listarProdutos(lista = produtosDisponiveis) {
    listaProdutosDiv.innerHTML = "";

    // Para cada produto no array do JS,
    // criar no html a lista de produtos
    lista.forEach(produto => {
        let itemDiv = document.createElement("div");
        itemDiv.className = "itemProd";

        //Estrutura dos produtos no site
        itemDiv.innerHTML = `
            <img src="${produto.imagem}" class="imgProd" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2).replace('.', ',')}</p> 
            <button class="btn-add" data-id="${produto.id}">Adicionar ao carrinho</button>
        `;

        listaProdutosDiv.appendChild(itemDiv);
    });

    // Evento de clique para os botões "Adicionar ao carrinho"
    document.querySelectorAll(".btn-add").forEach(botao => {
        botao.addEventListener("click", () => {
            const idDoProduto = parseInt(botao.getAttribute("data-id"));
            console.log("Click produto id: ", idDoProduto);
            
            adicionarAoCarrinho(idDoProduto);
        });
    });
}

// Função de salvar dados do carrinho
function salvarDados() {
    localStorage.setItem("dadosCarrinho", JSON.stringify(arrayCarrinhoProdutos));
    console.log("Os produtos do carrinho foram salvos.");
}

// Função de carregar dados salvos
function carregarDados() {
    const dadosSalvos = localStorage.getItem("dadosCarrinho");

    if (dadosSalvos) {
        arrayCarrinhoProdutos = JSON.parse(dadosSalvos);

            atualizarTabela();

        console.log("Os produtos salvos foram carregados.");
    }
}

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(idProduto) {
    const produtoSelecionado = produtosDisponiveis.find(produto => produto.id === idProduto);

    let itemExistente = arrayCarrinhoProdutos.find(item => item.id === idProduto);

    // Se o produto adicionado já está no carrinho,
    // adicionar mais uma unidade do produto, senão
    // só adiciona o produto no carrinho
    if (itemExistente) {
        itemExistente.quant += 1;
    } else {
        let novoItemCarrinho = {
            id: produtoSelecionado.id,
            nome: produtoSelecionado.nome,
            valor: produtoSelecionado.preco,
            quant: 1
        };
        arrayCarrinhoProdutos.push(novoItemCarrinho);
    }

    // Atualizar tabela e salvar dados
    atualizarTabela();
    salvarDados();
    console.log("Carrinho atual:", arrayCarrinhoProdutos);
}

// Função para remover produtos do carrinho
function removerDoCarrinho(idProduto) {
    let itemNoCarrinho = arrayCarrinhoProdutos.find(item => item.id === idProduto);

    if (itemNoCarrinho) {
        if (itemNoCarrinho.quant > 1) {
            itemNoCarrinho.quant -= 1;
        } else {
            arrayCarrinhoProdutos = arrayCarrinhoProdutos.filter(item => item.id !== idProduto);
        }
    }
    atualizarTabela();
    salvarDados();
    console.log("Produto removido do carrinho, id:", idProduto);
}

// Função para atualizar a tabela do carrinho e o valor total
function atualizarTabela() {
    
    tabelaItens.innerHTML = "";

    if (arrayCarrinhoProdutos.length === 0) {
        avisoCarrinho.innerText = "*SEM PRODUTOS NO CARRINHO*";
        tabelaItens.innerHTML = "";
    } else {
        avisoCarrinho.innerText = "";
        tabelaItens.innerHTML = `
        <tr>
            <th>Produtos</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th>Ações</th>
        </tr>
    `;
    }

    let valorTotalGeral = 0;

    // Para cada produto no array do carrinho,
    // calcular o valor, colocar na tabela html
    // e atualizar o valor total da compra
    arrayCarrinhoProdutos.forEach(item => {
        let valorTotalItem = item.valor * item.quant;

        valorTotalGeral += valorTotalItem;

        let linhaTabela = document.createElement("tr");

        linhaTabela.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quant}</td>
            <td>R$ ${valorTotalItem.toFixed(2).replace('.', ',')}</td>
            <td><button onclick="removerDoCarrinho(${item.id})">Remover</button></td>
        `;

        tabelaItens.appendChild(linhaTabela);
    })

    totalTexto.innerText = `R$ ${valorTotalGeral.toFixed(2).replace('.', ',')}`;

}

// Função para filtrar produtos com base no valor
function filtrarProdutos() {

    let listaFiltrada = [];

    // Switch case para mostrar produtos
    // conforme a condição que é representada
    // pela variável
    switch(seletorFiltro.value) {
        case "acima50":
            let maior50 = produtosDisponiveis.filter(item => item.preco > 50);
            listaFiltrada = maior50;
            break;
        case "ate50":
            let max50 = produtosDisponiveis.filter(item => item.preco <= 50);
            listaFiltrada = max50;
            break;
        default:
            listaFiltrada = produtosDisponiveis;
            break;
    }
    listarProdutos(listaFiltrada);
}

// Listar produtos carregar os dados
// e acionar o filtro de pesquisa quando o
// Javascript é carregado no HTML
listarProdutos();
carregarDados();
seletorFiltro.addEventListener("change", filtrarProdutos);
