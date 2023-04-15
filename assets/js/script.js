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
const darkModeSistem = document.querySelector('.dark-sistem');
const darkModeCss = document.querySelector('.dark');
const darkModeCheck = document.querySelector('#check-apple');

const option = `<option value="default" disabled selected>Selecione uma opção</option>`;

darkModeCheck.addEventListener('change', () => {
    darkModeCheck.checked ? darkModeCss.href = 'assets/css/dark.css' : darkModeCss.href = '', darkModeSistem.href = '';
});

let tipo;
inputTipo.onchange = tipoAutomovel;
function tipoAutomovel() {
    tipo = inputTipo.value;

    formMarca.style.display = 'none';
    formModelo.style.display = 'none';
    formAno.style.display = 'none';
    tableVeiculo.style.display = 'none';

    fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`)
        .then(response => {
            loading.style.display = 'block';
            if (response.ok && response.status === 200) {
                return response.json();
            } else {
                console.log(response.status)
                throw new Error("Busca por tipo");
            }
        }).then((data) => {
            loading.style.display = 'none';
            formMarca.style.display = 'block';

            selectMarca.innerHTML = '';
            selectMarca.innerHTML = option;

            data.forEach(marca => {
                selectMarca.innerHTML += `<option value="${marca.codigo}">${marca.nome}</option>`;
            });
        }).catch((error) => {
            console.warn(error.message);
        }).finally(() => selectMarca.onchange = buscaModelo);
}

let marcaEscolhida;
function buscaModelo() {
    loading.style.display = 'block';
    marcaEscolhida = selectMarca.value;

    formModelo.style.display = 'none';
    formAno.style.display = 'none';
    tableVeiculo.style.display = 'none';

    fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marcaEscolhida}/modelos`)
    .then(response => {
        if (response.ok && response.status === 200) {
            return response.json();
        } else {
            console.log(response.status)
            throw new Error("Busca por modelo");
        }
    }).then((data) => {
        loading.style.display = 'none';
        formModelo.style.display = 'block';

        selectModelo.innerHTML = '';
        selectModelo.innerHTML = option;
        data.modelos.forEach((modelo) => {
            selectModelo.innerHTML += `<option value="${modelo.codigo}">${modelo.nome}</option>`;
        });
        data.anos.forEach((modelo) => {
            selectModelo.innerHTML += `<option value="${modelo.codigo}">${modelo.nome}</option>`;
        });
    }).catch((error) => {
        console.warn(error.message);
    }).finally(() => selectModelo.onchange = buscaAno);
}