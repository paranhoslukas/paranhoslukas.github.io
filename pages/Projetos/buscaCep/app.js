import { buscarCep } from "./buscarCep.js";
const formulario = document.forms.namedItem('endereco');
const inputCep = document.getElementById('cep');

/*inputCep.addEventListener('change', (event) => {
    const cep = event.target.value;});
*/

inputCep.oninput = () => {
    const cep = inputCep.value;
    if (cep.length === 8) { 
        buscarCep(cep, preencherCampos, erro);
    }
}

function preencherCampos(endereco) {
    formulario.rua.value = endereco.street;
    formulario.bairro.value = endereco.neighborhood;
    formulario.cidade.value = endereco.city;
    formulario.estado.value = endereco.state;
}

function erro(erro) {
    if (erro.errors && erro.errors.length > 0) {
        alert(erro.errors[0].message);
    } else {
        alert("Erro ao buscar o CEP");
        limparFormularioEFocarNoCEP();
    }
}

function limparFormularioEFocarNoCEP(){
    formulario.reset();
    inputCep.focus();
}