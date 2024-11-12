function mudarMensagem() {
    document.getElementById('mensagem').textContent = 'Obrigada por passares!';
}

function restaurarMensagem() {
    document.getElementById('mensagem').textContent = 'Passe por aqui';
}

// O resto do código permanece igual
function mudarCorTexto(cor) {
    document.getElementById('mudaTexto').style.color = cor;
}

function mudarCorCaixa() {
    const caixa = document.getElementById('caixaTexto');
    const cores = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    caixa.style.backgroundColor = corAleatoria;
}

function mudarFundo() {
    const cor = document.getElementById('caixaCor').value;
    document.body.style.backgroundColor = cor;
}

let contador = 0;
function contar() {
    contador++;
    document.getElementById('contadorDisplay').textContent = contador;
}
