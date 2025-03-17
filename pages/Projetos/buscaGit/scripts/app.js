const input = document.querySelector("input");
const botao = document.querySelector("button");
const usuarioContainer = document.getElementById("usuario");
const listarRepositorios = document.querySelector("ul");

async function buscarUsuario() {
  const usuario = input.value;
  const URL = `https://api.github.com/users/${usuario}`;
  try {
    const dados = await fetch(URL);
    const usuario = await dados.json();
    return usuario;
  } catch (error) {
    console.log(error);
  }
}

async function buscarRepositorio() {
  try {
    const usuario = input.value;
    const URL = `https://api.github.com/users/${usuario}/repos`;
    const response = await fetch(URL);
    const repositorios = await response.json();

    listaRepositorios(repositorios);
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
  }
}

function listaRepositorios(repositorios) {
  const ulElement = document.querySelector('ul');
  ulElement.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

  repositorios.forEach(repositorio => {
    const liElement = document.createElement('li');
    liElement.innerHTML = templateRepositorio(repositorio);
    ulElement.appendChild(liElement);
  });
}

function templateRepositorio(repositorio) { 
  return `
    <div>
        <h3>${repositorio.full_name}</h3>
       <button> <a href="${repositorio.html_url}" target="_blank">Acessar repositório</a> </button>
    </div>
  `;
}

function templateUsuario(usuario) {
  return `
    <img src="${usuario.avatar_url}" class="rounded-full w-2/12">
    <h1 class="flex items-center justify-between gap-2">${usuario.name}</h1>
    <div>
    <p>Seguidores ${usuario.followers}</p>
    <p>Seguindos ${usuario.following}</p>
    </div>
  `;
}

function mostrarUsuario(usuario) {
  usuarioContainer.innerHTML = templateUsuario(usuario);
}

botao.onclick = () => {
  buscarUsuario().then(mostrarUsuario).then(buscarRepositorio);
};
