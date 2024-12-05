document.addEventListener('DOMContentLoaded', function () {
    carregarProdutos(produtos);
    carregarCesto();
});

function carregarProdutos(produtos) {
    const sectionProdutos = document.getElementById('produtos');
    sectionProdutos.innerHTML = ''; 

    produtos.forEach(produto => {
        const artigo = criarProduto(produto);
        sectionProdutos.appendChild(artigo);
    });


    const botoesAdicionar = sectionProdutos.querySelectorAll('.produto button');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function () {
            const produtoId = parseInt(this.getAttribute('data-id'));
            const produtoSelecionado = produtos.find(p => p.id === produtoId);
            adicionarAoCesto(produtoSelecionado);
        });
    });

    const botoesAdicionarTudo = sectionProdutos.querySelectorAll('.produto button');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function () {
            const produtoId = parseInt(this.getAttribute('data-id'));
            const produtoSelecionado = [...produtos].find(p => p.id === produtoId);
            adicionarAoCesto(produtoSelecionado);
        });
    });
}


function criarProduto(produto) {
    const artigo = document.createElement('article');
    artigo.classList.add('produto');

    artigo.innerHTML = `
        <img src="${produto.image}" alt="${produto.title}">
        <h3>${produto.title}</h3>
        <p>${produto.description}</p>
        <p><strong>Preço:</strong> $${produto.price}</p>
        <p><strong>Categoria:</strong> ${produto.category}</p>
        <p><strong>Avaliação:</strong> ${produto.rating.rate} (${produto.rating.count} avaliações)</p>
        <button data-id="${produto.id}">+ Adicionar ao Cesto</button>
    `;

    return artigo;
}


// Objeto do cesto
let cesto = {
    produtos: [],
    total: 0,
    adicionarProduto: function (produto) {
        this.produtos.push(produto);
        this.total += produto.price;
        atualizarCesto();
    }
};
async function realizarCompra() {
    // Obter os produtos no cesto
    const produtos = cesto.produtos.map(produto => produto.id); // IDs dos produtos
    const estudante = document.getElementById('simounao').checked; // Status de estudante
    const cupao = document.getElementById('desconto').value.trim(); // Valor do cupão

    // Verificar se existem produtos no cesto
    if (produtos.length === 0) {
        alert("Erro: Nenhum produto no cesto.");
        return;
    }

    // Calcula o total inicial
    let totalComDesconto = cesto.total;

    // Aplicar desconto de estudante
    const descontoEstudante = estudante ? 8.88 : 0;
    totalComDesconto -= descontoEstudante;

    // Aplicar desconto do cupão "black-friday"
    if (cupao.toLowerCase() === "black-friday") {
        totalComDesconto *= 0.5; // Aplica 50% de desconto
    }

    // Garantir que o valor final nunca seja menor que 0
    if (totalComDesconto < 0) {
        totalComDesconto = 0;
    }

    // Corpo da requisição
    const body = {
        products: produtos,
        student: estudante,
        coupon: cupao,
    };

    try {
        // Simulando a chamada à API (substitua pela sua chamada real, se necessário)
        const response = await fetch('https://deisishop.pythonanywhere.com/buy/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Resposta do servidor:', text);
            throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
            alert(`Erro: ${data.error}`);
        } else {
            // Atualizar o DOM com as mensagens
            const cestoSection = document.getElementById('cesto');

            // Valor final com desconto
            let valorFinal = document.getElementById('valorFinal');
            if (!valorFinal) {
                valorFinal = document.createElement('h3'); // Alterado de <p> para <h3>
                valorFinal.id = 'valorFinal';
                cestoSection.appendChild(valorFinal);
            }
            valorFinal.textContent = `Valor final a pagar (com eventuais descontos): ${totalComDesconto.toFixed(2)}€`;

            // Referência de pagamento
            let referenciaPagamento = document.getElementById('referenciaPagamento');
            if (!referenciaPagamento) {
                referenciaPagamento = document.createElement('p');
                referenciaPagamento.id = 'referenciaPagamento';
                cestoSection.appendChild(referenciaPagamento);
            }
            referenciaPagamento.textContent = `Referência de pagamento: ${data.reference}€`;
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert(`Erro na requisição: ${error.message}`);
    }
}




// Função para remover um produto do cesto
function removerDoCesto(index) {
    listaCesto.splice(index, 1); // Remove o produto pelo índice
    atualizarCesto();
}

// Função para adicionar um produto ao cesto
function adicionarAoCesto(produto) {

    cesto.adicionarProduto(produto); 
    cesto.adicionarProdutoTudo(produto);// Adiciona ao cesto
    localStorage.setItem('cesto', JSON.stringify(cesto.produtos)); // Atualiza o localStorage
    atualizarCesto(); // Atualiza o DOM
}

// Função para carregar o cesto da página e atualizar o DOM
function carregarCesto() {
    const produtosNoCesto = JSON.parse(localStorage.getItem('carrinho')) || [];
    cesto.produtos = produtosNoCesto; // Atualiza os produtos no objeto `cesto`
    cesto.total = produtosNoCesto.reduce((total, produto) => total + produto.price, 0); // Calcula o total
    atualizarCesto(); // Atualiza o DOM
}

// Função para atualizar o DOM do cesto
function atualizarCesto() {
    const listaCesto = document.getElementById('listaCesto');
    const totalCesto = document.getElementById('totalCesto');

    // Limpa a lista do cesto antes de recriar os itens
    listaCesto.innerHTML = '';

    cesto.produtos.forEach((produto, index) => {
        const li = document.createElement('li');
        li.style.listStyle = 'none'; // Remove o marcador da lista.
        
        // HTML do produto
        li.innerHTML = `
            <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            background-color: #FDE962;
            padding: 15px;
            border-radius: 8px;
            margin: 10px;
            width: 200px; /* Largura fixa para cada caixa */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        ">
                <img src="${produto.image}" alt="${produto.title}" style="width: 100px; height: auto; margin-bottom: 10px; border-radius: 5px;">
                <div>
                    <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: bold;">${produto.title}</h4>
                    <p style="margin: 0 0 8px; font-size: 14px;"><strong>Preço:</strong> $${produto.price.toFixed(2)}</p>
                </div>
                <button style="
                background-color: #000000;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
            " class="btn-remover">- Remover artigo</button>
            </div>
        `;

        // Adiciona o evento de clique ao botão "Remover artigo"
        const btnRemover = li.querySelector('.btn-remover');
        btnRemover.addEventListener('click', () => {
            removerProdutoDoCesto(index); // Remove o produto pelo índice
        });

        listaCesto.appendChild(li);
    });

    // Atualiza o custo total
    totalCesto.textContent = `Custo total: ${cesto.total.toFixed(2)}€`;
}

// Função para remover o produto do cesto
function removerProdutoDoCesto(index) {
    // Remove o produto pelo índice
    cesto.produtos.splice(index, 1);

    // Atualiza o custo total
    cesto.total = cesto.produtos.reduce((total, produto) => total + produto.price, 0);

    // Atualiza o DOM do cesto
    atualizarCesto();
}
// URL da API DEISI Shop (você precisa obter a URL correta no enunciado ou documentação)
const apiURL = "https://deisishop.pythonanywhere.com/products/";

// Fazer o pedido
fetch(apiURL)
  .then(response => {
    // Verificar se a resposta é válida (status 200)
    if (!response.ok) {
        throw new Error(`Erro ao obter os produtos: ${response.status}`);
    }
    // Converter a resposta para JSON
    return response.json();
  })
  .then(data => {
    // Processar os dados dos produtos
    console.log("Produtos obtidos:", data);
    // Aqui você pode atualizar a página com os produtos
    carregarProdutos(data);
  })
  .catch(error => {
    // Lidar com erros
    console.error("Erro ao buscar os produtos:", error);
  });

  document.addEventListener('DOMContentLoaded', function () {
    carregarProdutos(produtos);
    carregarCesto();
    carregarCategorias();
});

function carregarCategorias() {
    // Obter as categorias únicas dos produtos
    const categorias = [...new Set(produtos.map(produto => produto.category))];

    // Obter o elemento select
    const selectCategoria = document.getElementById('categoria');

    // Preencher o select com as opções de categoria
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        selectCategoria.appendChild(option);
    });

    // Adicionar o evento de mudança para filtrar os produtos
    selectCategoria.addEventListener('change', function () {
        const categoriaSelecionada = this.value;
        filtrarProdutos(categoriaSelecionada);
    });
}

function filtrarProdutos(categoria) {
    const produtosFiltrados = categoria === 'todos' 
        ? produtos 
        : produtos.filter(produto => produto.category === categoria);

    carregarProdutos(produtosFiltrados);
}

function carregarProdutos(produtos) {
    const sectionProdutos = document.getElementById('produtos');
    sectionProdutos.innerHTML = ''; 

    produtos.forEach(produto => {
        const artigo = criarProduto(produto);
        sectionProdutos.appendChild(artigo);
    });

    const botoesAdicionar = sectionProdutos.querySelectorAll('.produto button');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function () {
            const produtoId = parseInt(this.getAttribute('data-id'));
            const produtoSelecionado = produtos.find(p => p.id === produtoId);
            adicionarAoCesto(produtoSelecionado);
        });
    });
}

function criarProduto(produto) {
    const artigo = document.createElement('article');
    artigo.classList.add('produto');

    artigo.innerHTML = `
        <img src="${produto.image}" alt="${produto.title}">
        <h3>${produto.title}</h3>
        <p>${produto.description}</p>
        <p><strong>Preço:</strong> $${produto.price}</p>
        <p><strong>Categoria:</strong> ${produto.category}</p>
        <p><strong>Avaliação:</strong> ${produto.rating.rate} (${produto.rating.count} avaliações)</p>
        <button data-id="${produto.id}">+ Adicionar ao Cesto</button>
    `;

    return artigo;
}

// O restante do código permanece igual.
document.addEventListener('DOMContentLoaded', function () {
    const apiURL = "https://deisishop.pythonanywhere.com/products/";
    let produtos = []; // Armazena todos os produtos obtidos da API.

    // Carregar produtos da API e inicializar a página
    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao obter os produtos: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            produtos = data; // Atualiza a lista de produtos
            carregarProdutos(produtos); // Exibe os produtos
            carregarCategorias(produtos); // Preenche o select com categorias
        })
        .catch(error => {
            console.error("Erro ao buscar os produtos:", error);
        });

    // Função para carregar categorias no select
    function carregarCategorias(produtos) {
        const categorias = [...new Set(produtos.map(produto => produto.category))];
        const selectCategoria = document.getElementById('categoria');

        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            selectCategoria.appendChild(option);
        });

        // Evento para filtrar os produtos pela categoria selecionada
        selectCategoria.addEventListener('change', function () {
            const categoriaSelecionada = this.value;
            filtrarProdutos(categoriaSelecionada);
        });
    }

    // Função para filtrar produtos por categoria
    function filtrarProdutos(categoria) {
        const produtosFiltrados = categoria === 'todos'
            ? produtos
            : produtos.filter(produto => produto.category === categoria);

        carregarProdutos(produtosFiltrados);
    }

    // Função para carregar produtos no DOM
    function carregarProdutos(produtos) {
        const sectionProdutos = document.getElementById('produtos');
        sectionProdutos.innerHTML = ''; // Limpa os produtos existentes

        produtos.forEach(produto => {
            const artigo = criarProduto(produto);
            sectionProdutos.appendChild(artigo);
        });

        const botoesAdicionar = sectionProdutos.querySelectorAll('.produto button');
        botoesAdicionar.forEach(botao => {
            botao.addEventListener('click', function () {
                const produtoId = parseInt(this.getAttribute('data-id'));
                const produtoSelecionado = produtos.find(p => p.id === produtoId);
                adicionarAoCesto(produtoSelecionado);
            });
        });
    }

    // Função para criar o elemento HTML de um produto
    function criarProduto(produto) {
        const artigo = document.createElement('article');
        artigo.classList.add('produto');

        artigo.innerHTML = `
            <img src="${produto.image}" alt="${produto.title}">
            <h3>${produto.title}</h3>
            <p>${produto.description}</p>
            <p><strong>Preço:</strong> $${produto.price}</p>
            <p><strong>Categoria:</strong> ${produto.category}</p>
            <p><strong>Avaliação:</strong> ${produto.rating.rate} (${produto.rating.count} avaliações)</p>
            <button data-id="${produto.id}">+ Adicionar ao Cesto</button>
        `;

        return artigo;
    }



// Adiciona eventos para ordenar os produtos por preço
const selectOrdenacao = document.getElementById('ordenacao');

selectOrdenacao.addEventListener('change', function () {
    const ordenacao = this.value;
    ordenarProdutos(ordenacao);
});

// Função para ordenar os produtos
function ordenarProdutos(ordenacao) {
    let produtosOrdenados;

    if (ordenacao === 'rating-crescente') {
        produtosOrdenados = [...produtos].sort((a, b) => a.rating.rate.count - b.rating.rate.count);
    } else if (ordenacao === 'rating-decrescente') {
        produtosOrdenados = [...produtos].sort((a, b) => b.rating.rate.count - a.rating.rate.count);
    } else {
        produtosOrdenados = [...produtos]; // Mantém a ordem original, sem alteração
    }

    carregarProdutos(produtosOrdenados); // Carrega os produtos ordenados
}

  // Função para filtrar produtos por nome
  const inputPesquisa = document.getElementById('pesquisa');
  inputPesquisa.addEventListener('input', function () {
      const termoPesquisa = this.value.toLowerCase(); // Obtém o termo de pesquisa
      filtrarPorNomeEDescricao(termoPesquisa);
  });

  // Função para filtrar produtos pelo nome
  function filtrarPorNomeEDescricao(termoPesquisa) {
      const produtosFiltrados = produtos.filter(produto => {
          return produto.title.toLowerCase().includes(termoPesquisa) && produto.description.toLowerCase().includes(termoPesquisa); 
      });

      carregarProdutos(produtosFiltrados); // Exibe os produtos filtrados
  }



  
  
});


