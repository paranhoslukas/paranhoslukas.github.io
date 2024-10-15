const formCotacoes = document.forms.namedItem("formCotacoes");
const inputMoedas = document.querySelector("#moeda");
const trazerMoedaDiv = document.querySelector("#trazerMoeda");

formCotacoes.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(inputMoedas);
  const moedas = inputMoedas.value;
  receberMoeda(moedas);
});

function receberMoeda(moedas) {
  const URL = `https://economia.awesomeapi.com.br/json/last/${moedas}`;
  const requisicao = new XMLHttpRequest();

  requisicao.open("GET", URL);

  requisicao.onload = () => {
    if (requisicao.status === 200) {
      const respostaMoedas = JSON.parse(requisicao.response);
      console.log(respostaMoedas);
      trazerMoedas(respostaMoedas[moedas.replace("-", "")]);
    } else {
      console.error("Erro ao buscar dados da API");
    }
  };

  requisicao.onerror = () => {
    console.error("Erro de rede");
  };

  requisicao.send();
}

function trazerMoedas(moeda) {
  const trazerMoedaDiv = document.querySelector("#trazerMoeda");
  trazerMoedaDiv.innerHTML = templateMoedas(moeda);
}

function templateMoedas(moeda) {
  const currencySymbol = getCurrencySymbol(moeda.codein);
  return `
  <h2>${moeda.name}</h2>
  <p>De: ${moeda.code}</p>
  <p>Para: ${moeda.codein}</p>
  <p>Valor: ${currencySymbol}${parseFloat(moeda.ask).toFixed(2)}</p>
  `;
}

function getCurrencySymbol(codein) {
  switch (codein) {
    case 'BRL':
      return 'R$';
    case 'USD':
      return 'US$';
    case 'EUR':
      return '€';
    case 'BTC':
      return '₿';
    default:
      return '';
  }
}
