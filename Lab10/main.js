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