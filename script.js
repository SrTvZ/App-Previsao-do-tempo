const key = "4c71bebd1d2e31542f30ed22ee50aadd";

function colocarDadosNaTela(dados) {
  document.querySelector(".cidade").innerHTML = dados.name;
  document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
  document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
  document.querySelector(".umidade").innerHTML = dados.main.humidity;
  document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function buscarCidade(cidade) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`;

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
    }

    const dados = await resposta.json();
    colocarDadosNaTela(dados);

  } catch (erro) {
    alert(erro.message);

  }
}

function cliqueiNoBotao() {
  const cidade = document.querySelector(".input-cidade").value;
  buscarCidade(cidade);
}

const inputCidade = document.querySelector(".input-cidade");
inputCidade.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    const cidade = inputCidade.value;
    buscarCidade(cidade);
  }
});
