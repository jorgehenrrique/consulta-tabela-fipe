const inputTipo = document.querySelector('#tipo');
const formMarca = document.querySelector('.marca');
const selectMarca = document.querySelector('#marca');
const loading = document.querySelector('.loader');
const formModelo = document.querySelector('.modelo');
const selectModelo = document.querySelector('#modelo');
const formAno = document.querySelector('.ano');
const selectAno = document.querySelector('#ano');
const tableVeiculo = document.querySelector('.table');
const listaVeiculo = document.querySelector('#lista-veiculo');

let consultaFipe = new XMLHttpRequest();
let consultaFipeM = new XMLHttpRequest();
let consultaFipeAno = new XMLHttpRequest();
let consultaFipeAnoTipo = new XMLHttpRequest();

let tipo;
function tipoAutomovel() {
    // console.log(inputTipo.value);
    tipo = inputTipo.value;
    consultaFipe.open('GET', `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`, true);
    consultaFipe.send();
    consultaFipe.onreadystatechange = () => buscar(consultaFipe);

    formMarca.style.display = 'none';
    formModelo.style.display = 'none';
    formAno.style.display = 'none';
    tableVeiculo.style.display = 'none';
}
inputTipo.onchange = tipoAutomovel;

function buscar(consultaFipe) {
    if (consultaFipe.readyState === 1) { // Status da requisição
        loading.style.display = 'block';
        console.log('bad');
    }
    if (consultaFipe.readyState === 4) {
        console.log('DONE')
        loading.style.display = 'none';
        tratamentoFipe(consultaFipe);
        console.log(consultaFipe.readyState)
        if (consultaFipe.status === 200) { // Status Code
            console.log('otimo! sucesso')
        } else {
            console.log('muito ruim')
        }
    }
}

function tratamentoFipe(consultaFipe) {
    formMarca.style.display = 'block';
    let tabela = JSON.parse(consultaFipe.responseText);
    console.log(tabela)

    selectMarca.innerHTML = '';
    tabela.forEach(listaMarca);
}

function listaMarca(marca) {
    selectMarca.innerHTML += `<option value="${marca.codigo}">${marca.nome}</option>`;

    selectMarca.onchange = buscaModelo;
}

// Modelo

let marcaEscolhida;
function buscaModelo() {
    formModelo.style.display = 'block';
    marcaEscolhida = selectMarca.value;
    console.log('codigo marca', marcaEscolhida)

    consultaFipeM.open('GET', `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marcaEscolhida}/modelos`, true);
    consultaFipeM.send();
    consultaFipeM.onreadystatechange = () => buscaModelos(consultaFipeM);
}

function buscaModelos(consultaFipeM) {
    if (consultaFipeM.readyState === 1) { // Status da requisição
        console.log('bad-2'); //
        loading.style.display = 'none';
    }
    if (consultaFipeM.readyState === 4) {
        console.log('DONE-2') //
        loading.style.display = 'none';
        tratamentoFipeModelos(consultaFipeM);
        console.log(consultaFipeM.readyState)
        if (consultaFipeM.status === 200) { // Status Code
            console.log('otimo! sucesso-2') //
        } else {
            console.log('muito ruim-2') //
        }
    }
}

function tratamentoFipeModelos(consultaFipeM) {
    let tabelaModelos = JSON.parse(consultaFipeM.responseText);
    console.log(tabelaModelos)
    console.log('modelos tabela')

    selectModelo.innerHTML = '';
    tabelaModelos.modelos.forEach(listaModelo)
    tabelaModelos.anos.forEach(listaModelo)
}

function listaModelo(modelo) {
    console.log('LISTA MODELOS')
    selectModelo.innerHTML += `<option value="${modelo.codigo}">${modelo.nome}</option>`;

    selectModelo.onchange = buscaAno;
}

//  Ano

let modeloEscolhido;
function buscaAno() {
    formAno.style.display = 'block';
    modeloEscolhido = selectModelo.value;
    console.log('codigo ano', modeloEscolhido)
    console.log('codigo marca', marcaEscolhida)

    consultaFipeAno.open('GET', `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marcaEscolhida}/modelos/${modeloEscolhido}/anos`, true);
    consultaFipeAno.send();
    consultaFipeAno.onreadystatechange = () => buscaAnos(consultaFipeAno);
}

function buscaAnos(consultaFipeAno) {
    if (consultaFipeAno.readyState === 1) { // Status da requisição
        console.log('bad-3'); //
        loading.style.display = 'none';
    }
    if (consultaFipeAno.readyState === 4) {
        console.log('DONE-3') //
        loading.style.display = 'none';
        tratamentoFipeAno(consultaFipeAno);
        console.log(consultaFipeAno.readyState)
        if (consultaFipeAno.status === 200) { // Status Code
            console.log('otimo! sucesso-3') //
        } else {
            console.log('muito ruim-3') //
        }
    }
}

function tratamentoFipeAno(consultaFipeAno) {
    let tabelaAnos = JSON.parse(consultaFipeAno.responseText);
    console.log(tabelaAnos)
    console.log('anos tabela')

    selectAno.innerHTML = '';
    tabelaAnos.forEach(listaAnos)
}

function listaAnos(modelo) {
    console.log('LISTA ANOS')
    selectAno.innerHTML += `<option value="${modelo.codigo}">${modelo.nome}</option>`;

    selectAno.onchange = buscaAnoTipo;
}

// Veiculo


let anoEscolhido;
function buscaAnoTipo() {
    // tableVeiculo.style.display = 'block';
    anoEscolhido = selectAno.value;
    console.log('codigo ano', anoEscolhido)
    console.log('codigo modelo', modeloEscolhido)
    console.log('codigo marca', marcaEscolhida)

    consultaFipeAnoTipo.open('GET', `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marcaEscolhida}/modelos/${modeloEscolhido}/anos/${anoEscolhido}`, true);
    consultaFipeAnoTipo.send();
    consultaFipeAnoTipo.onreadystatechange = () => buscaAnosTipo(consultaFipeAnoTipo);
}

function buscaAnosTipo(consultaFipeAnoTipo) {
    if (consultaFipeAnoTipo.readyState === 1) { // Status da requisição
        console.log('bad-3'); //
        loading.style.display = 'none';
    }
    if (consultaFipeAnoTipo.readyState === 4) {
        console.log('DONE-3') //
        loading.style.display = 'none';
        tratamentoFipeAnoTipo(consultaFipeAnoTipo);
        console.log(consultaFipeAnoTipo.readyState)
        if (consultaFipeAnoTipo.status === 200) { // Status Code
            console.log('otimo! sucesso-3') //
        } else {
            console.log('muito ruim-3') //
        }
    }
}

function tratamentoFipeAnoTipo(consultaFipeAnoTipo) {
    tableVeiculo.style.display = 'block';
    let veiculo = JSON.parse(consultaFipeAnoTipo.responseText);
    console.log(veiculo)
    console.log('anostipo tabela')

    listaVeiculo.innerHTML = '';

    listaVeiculoTabela(veiculo);
}

function listaVeiculoTabela(modelo) {
    console.log('LISTA ANOS')

    for (let veiculo in modelo) {
        listaVeiculo.innerHTML += `<tr><td>${veiculo}:</td><td>${modelo[veiculo]}</td></tr>`;
    }
}