export function buscarCep(cep, sucesso, erro) {
    const URL = `https://brasilapi.com.br/api/cep/v2/${cep}`;

    const requisicao = new XMLHttpRequest();
    requisicao.open('GET', URL);

    requisicao.onload = () => {
        if (requisicao.status === 200) {
            const endereco = JSON.parse(requisicao.response);
            sucesso(endereco);
        } else {
            erro(JSON.parse(requisicao.response));
        }
    };

    requisicao.onerror = () => {
        erro({ errors: [{ message: "Erro na requisição" }] });
    };

    requisicao.send();
}