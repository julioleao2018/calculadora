'use strict';

const display = document.getElementById('resultado');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
}

// Atualizar os resultados.
const atualizarDisplay = (texto) => {

    // se true Limpa o texto do display.
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
}

// Inserindo o numero na arrow function.
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

// adiciona um evento click a cada loop.
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
    }
};
// adiciona um evento click para cada operador.
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

// fatiar array e voltar um numero no display.
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

// Inverte o sinal da operação.
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1)
};
document.getElementById('inverter').addEventListener('click', inverterSinal);

// procura em uma string se existe o decimal. 
const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

// Mapear teclado e chamar as funções dos botões.
const mapaTeclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '+': 'operadorSomar',
    '=': 'igual',
    'Enter': 'igual',
    'Backspace': 'backspace',
    'c': 'limparDisplay',
    'Escape': 'limparCalculo',
    ',': 'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    // Verifica se uma das chaves existe a tecla no array.
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
    if (teclaPermitida()) {
        document.getElementById(mapaTeclado[tecla]).click();
    }
}
document.addEventListener('keydown', mapearTeclado);