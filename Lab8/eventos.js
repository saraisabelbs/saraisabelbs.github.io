function mudarMensagem() {
    document.getElementById('mensagem').textContent = '1. Obrigada por passares!';
}

function restaurarMensagem() {
    document.getElementById('mensagem').textContent = '1. Passa por aqui!';
}


document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
        const cor = button.dataset.color;
        document.getElementById('mudaTexto').style.color = cor;
    });
});


const mudarCorCaixa = () => {
    const caixa = document.getElementById('caixaTexto');
    const cores = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    caixa.style.backgroundColor = corAleatoria;
};


function mudarFundo() {
    const cor = document.getElementById('caixaCor').value;
    document.body.style.backgroundColor = cor;
}

// Função para mudar a cor de fundo
function mudarFundo() {
    const cor = document.getElementById('caixaCor').value;
    document.body.style.backgroundColor = cor;
}


// Recuperar o valor do contador do localStorage (se existir)
let contadorAutom = localStorage.getItem('contadorAutom') ? parseInt(localStorage.getItem('contadorAutom')) : 0;

// Atualizar o contador no HTML
document.getElementById('contadorAutomatico').textContent = contadorAutom;

// Incrementar o contador a cada segundo e armazená-lo no localStorage
setInterval(() => {
    contadorAutom++;
    document.getElementById('contadorAutomatico').textContent = contadorAutom;

    // Salvar o valor atualizado no localStorage
    localStorage.setItem('contadorAutom', contadorAutom);
}, 1000);


// Inicializando o contador
let contador = 0;

function count() {
    contador++;
    document.getElementById('novoContador').textContent = contador;
}

setInterval(count, 1000);