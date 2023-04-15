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


