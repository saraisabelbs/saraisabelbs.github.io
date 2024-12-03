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


let cesto = {
    produtos: [],
    total: 0,
    adicionarProduto: function (produto) {
        this.produtos.push(produto);
        this.total += produto.price;
        atualizarCesto();
    }
};


function removerDoCesto(index) {
    listaCesto.splice(index, 1); 
    atualizarCesto();
}

function adicionarAoCesto(produto) {

    cesto.adicionarProduto(produto);
    localStorage.setItem('cesto', JSON.stringify(cesto.produtos)); 
    atualizarCesto(); 
}


function carregarCesto() {
    const produtosNoCesto = JSON.parse(localStorage.getItem('carrinho')) || [];
    cesto.produtos = produtosNoCesto; 
    cesto.total = produtosNoCesto.reduce((total, produto) => total + produto.price, 0); 
    atualizarCesto(); 
}

function atualizarCesto() {
    const listaCesto = document.getElementById('listaCesto');
    const totalCesto = document.getElementById('totalCesto');


    listaCesto.innerHTML = '';

    cesto.produtos.forEach((produto, index) => {
        const li = document.createElement('li');
        li.style.listStyle = 'none'; 
        
    
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
                background-color: #ff4d4d;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
            " class="btn-remover">- Remover artigo</button>
            </div>
        `;

    
        const btnRemover = li.querySelector('.btn-remover');
        btnRemover.addEventListener('click', () => {
            removerProdutoDoCesto(index); 
        });

        listaCesto.appendChild(li);
    });

    
    totalCesto.textContent = "Custo total: " + cesto.total.toFixed(2) + "€";

}

function removerProdutoDoCesto(index) {
    cesto.produtos.splice(index, 1);

    cesto.total = cesto.produtos.reduce((total, produto) => total + produto.price, 0);

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

    if (ordenacao === 'preco-crescente') {
        produtosOrdenados = [...produtos].sort((a, b) => a.price - b.price);
    } else if (ordenacao === 'preco-decrescente') {
        produtosOrdenados = [...produtos].sort((a, b) => b.price - a.price);
    } else {
        produtosOrdenados = [...produtos]; // Mantém a ordem original, sem alteração
    }

    carregarProdutos(produtosOrdenados); // Carrega os produtos ordenados
}

  // Função para filtrar produtos por nome
  const inputPesquisa = document.getElementById('pesquisa');
  inputPesquisa.addEventListener('input', function () {
      const termoPesquisa = this.value.toLowerCase(); // Obtém o termo de pesquisa
      filtrarPorNome(termoPesquisa);
  });

  // Função para filtrar produtos pelo nome
  function filtrarPorNome(termoPesquisa) {
      const produtosFiltrados = produtos.filter(produto => {
          return produto.title.toLowerCase().includes(termoPesquisa); // Verifica se o nome contém o termo
      });

      carregarProdutos(produtosFiltrados); // Exibe os produtos filtrados
  }


  
});








