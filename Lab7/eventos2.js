// Evento de clique
document.getElementById("caixaRato").addEventListener("click", function() {
    this.textContent = "Clica duas! Oh yeah!";
    this.style.backgroundColor = "#ffffff";
});

// Evento de duplo clique
document.getElementById("caixaRato").addEventListener("dblclick", function() {
    this.textContent = "Duplo clique! Grease Lightning!";
    this.style.backgroundColor = "#f8c0d0";
});

// Evento de mouseover
document.getElementById("caixaRato").addEventListener("mouseover", function() {
    this.style.backgroundColor = "#3498db";
    this.textContent = "Clica uma vez!";
});

// Evento de mouseout
document.getElementById("caixaRato").addEventListener("mouseout", function() {
    this.style.backgroundColor = "#f39c12";
    this.textContent = "Passe o rato aqui!";
});

// Evento de keydown
document.getElementById("campoTexto").addEventListener("keydown", function() {
    document.getElementById("textoExemplo").textContent = "Tecla pressionada!";
});

// Evento de keyup
document.getElementById("campoTexto").addEventListener("keyup", function() {
    document.getElementById("textoExemplo").textContent = "Tecla libertada!";
});

// Evento de submit
document.getElementById("formGrease").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("textoExemplo").innerHTML = "<strong>Formulário enviado com sucesso!</strong>";
    document.getElementById("textoExemplo").style.color = "#27ae60";
});

// Alterar elemento - texto
document.getElementById("alterarTexto").addEventListener("click", function() {
    document.getElementById("textoExemplo").textContent = "You're the one that I want!";
});


// Alterar elemento - cor
document.getElementById("alterarCor").addEventListener("click", function() {
    document.getElementById("textoExemplo").style.color = "#c0392b";
});
