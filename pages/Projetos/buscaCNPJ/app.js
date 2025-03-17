const formulario = document.forms.namedItem("formCnpj");
const inputCnpj = document.getElementById("cnpj");

const URL = `https://brasilapi.com.br/api/cnpj/v1/`;
const requisicao = new XMLHttpRequest();

inputCnpj.addEventListener("change", (event) => {
  const cnpj = event.target.value;

  receberCnpj(cnpj);
});

function receberCnpj(cnpj) {
  requisicao.open("GET", URL + cnpj);

  requisicao.onload = () => {
    if (requisicao.status === 200) {
      const empresa = JSON.parse(requisicao.response);
      console.log(empresa);
      preencherFomulario(empresa);
    }
  };

  requisicao.send();
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function preencherFomulario(empresa) {
  formulario.razao_social.value = empresa.razao_social;
  formulario.porte.value = empresa.porte;
  formulario.municipio.value = empresa.municipio;
  formulario.ddd_telefone_1.value = empresa.ddd_telefone_1;
  formulario.capital_social.value = formatarMoeda(empresa.capital_social);
}
