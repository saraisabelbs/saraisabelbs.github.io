// Evento de rato - mouseover e mouseout
const caixaRato = document.getElementById('caixaRato');
caixaRato.addEventListener('mouseover', () => {
    caixaRato.textContent = 'Obrigado por passar o rato!';
    caixaRato.style.backgroundColor = 'lightblue';
});
caixaRato.addEventListener('mouseout', () => {
    caixaRato.textContent = 'Passe o rato por cima desta caixa';
    caixaRato.style.backgroundColor = '';
});

// Evento de clique
const btnClick = document.getElementById('btnClick');
btnClick.addEventListener('click', () => {
    alert('Botão clicado!');
});

// Evento de duplo clique
const btnDbClick = document.getElementById('btnDbClick');
btnDbClick.addEventListener('dblclick', () => {
    btnDbClick.textContent = 'Duplo clique registado!';
    btnDbClick.style.color = 'red';
});

// Eventos de teclado - keydown e keyup
const inputTeclado = document.getElementById('inputTeclado');
inputTeclado.addEventListener('keydown', (e) => {
    console.log(`Tecla pressionada: ${e.key}`);
});
inputTeclado.addEventListener('keyup', () => {
    inputTeclado.style.backgroundColor = 'lightgreen';
});

// Evento de formulário - change e submit
const inputNome = document.getElementById('inputNome');
inputNome.addEventListener('change', () => {
    alert('O valor foi alterado!');
});

const formExemplo = document.getElementById('formExemplo');
formExemplo.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que o formulário seja enviado
    alert(`Formulário enviado com o nome: ${inputNome.value}`);
    inputNome.value = ''; // Limpa o campo de texto
});
