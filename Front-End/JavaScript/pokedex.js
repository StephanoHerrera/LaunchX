const button = document.getElementById("button");
const input = document.getElementById("input");
const img = document.getElementById("img");
const icon = document.getElementById("icon");
const pokeName = document.getElementById("poke-name");
const pokeType = document.getElementById("poke-type");
const pokeId = document.getElementById("poke-id");
const pokeHeight = document.getElementById("poke-height");
const pokeWeight = document.getElementById("poke-weight");
const PokeMoves = document.getElementById("moves-list");
const length = [];

button.onclick = () => {
  let pokeName = input.value;
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

  fetch(url).then((res) => {
    if (res.status != "200") {
      //
    }

    return res.json();
  }).then((data) => {
    if (pokeName !== "") {
      let rnd = Math.floor(Math.random() * 5);
      console.log(rnd);
      icon.src = `./img/icons/poke${rnd}.png`;
      printPokeImage(data.sprites.other.home.front_default);
      printPokeData(data);
      printPokeMoves(data);
    }
  });
}

const printPokeData = (data) => {
  pokeName.innerText = data.name;
  pokeType.innerHTML = "";
  
  for (let i = 0; i < data.types.length; i++) {
    const type = document.createElement("span");
    type.classList.add("pokeType");
    type.classList.add("col-2");
    pokeType.appendChild(type);
    type.innerText = data.types[i].type.name;
  }

  pokeId.innerText = data.id;
  pokeHeight.innerText = parseInt(data.height)/10 + " m";
  pokeWeight.innerText = parseInt(data.weight)/10 + " kg";
}

const printPokeMoves = (data) => {
  let moves = data.moves;
  PokeMoves.innerHTML = "";

  for (let i = 0; i < moves.length; i++) {
    const move = document.createElement("li");
    PokeMoves.appendChild(move); 
    move.classList.add("list-unstyled");
    move.innerText = moves[i].move.name;
  }
}

const printPokeImage = (url) => {
  img.src = url;
  
}

let rnd = Math.floor(Math.random() * 100) + 1
fetch(`https://pokeapi.co/api/v2/pokemon/${rnd}`).then((res) => {
  return res.json();
}).then((data) => {
  if (pokeName !== "") {
    fetchSpecie(data.species.url)
    printPokeImage(data.sprites.other.home.front_default);
    printPokeData(data);
    pokeStatsList(data);
    printPokeMoves(data);
  }
});

const fetchSpecie = (specie) => {
  fetch(specie).then(res => {
    return res.json();
  }).then(data => {
    const elementFacts = document.getElementById('facts');
    elementFacts.innerHTML = []
    data.flavor_text_entries.slice(0, 5).forEach(fact => {
      if (fact.language.name === 'en') {
        const liElement = document.createElement('li');
        liElement.innerHTML = fact.flavor_text;
        elementFacts.appendChild(liElement)
      }
    });
  });
}

const pokeStatsList = (data) => {
  let statsList = [];
  
  data.stats.forEach(element => {
    statsList.push(element.base_stat);
  });
  var xValues = ["HP", "ATK", "DEF", "SATK", "SDEF", "SPD"];
  var barColors = ["#ff000070", "#0000ff70", "#FE8B4A70", "#FADD5170", "#D1DDE870", "#984CEB70"];

  let chart = new Chart("pokeStats", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: statsList
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
            borderColor: "#d3d3d3",
            backgroundColor: "#d3d3d3"
          }
        },
        y: {
          suggestedMax: 200,
          beginAtZero: true,
          grid: {
            display: false,
            borderColor: "#d3d3d3",
            color: "#5f5f5f"

          }
        },
      },
      plugins: {
        legend: false
      }
    }
  });
}
