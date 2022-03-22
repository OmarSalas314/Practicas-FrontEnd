const pokeFondo = document.querySelector('[data-poke-container]');
const pokeNamec = document.querySelector('[data-poke-namec]');
const pokeImg = document.querySelector('[data-poke-img]');
const imagenpokeball = document.querySelector('[data-poke-img-container]');
const pokeFondosub = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeAbilities = document.querySelector('[data-poke-abilities]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeStatsNumber = document.querySelector('[data-poke-stats-number]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '',
};

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    /*Fetch pregunta al servidor sobre la consulta de arriba, la URL*/
    fetch(url).then((res) => {
        if (res.status != "200") {
                console.log(res);
                pokeImg("./imagen/LUTX.gif");
                
        }
        else {
            return res.json();  
                          
        }        
    }).then((data) => {
        console.log(data);                          
        let sprite = data.sprites.other.dream_world.front_default;
        let { types, abilities, stats }=data;
        pokeNamec.textContent = data.name;
        pokeImg.setAttribute('src', sprite); 
        pokeId.textContent = `Nº ${data.id}`;
        background(types);
        renderPokemonTypes(types);
        renderPokemonAbilities(abilities);
        renderPokemonStats(stats); 
        renderPokemonStatsNumber(stats);
                
    }); 
        
}       

const background = types => {
        const colorOne = typeColors[types[0].type.name];
        const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
        pokeFondo.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 70%)`;
        pokeFondo.style.backgroundSize = ' 100%';
}

const renderPokemonTypes = types => {
        pokeTypes.innerHTML = '';
        types.forEach(type => {
            const typeTextElement = document.createElement("div");
            typeTextElement.style.color = typeColors[type.type.name];
            typeTextElement.textContent = type.type.name;
            pokeTypes.appendChild(typeTextElement);
        });
}
    
const renderPokemonAbilities = abilities => {
        pokeAbilities.innerHTML = ''; /**Borra lo que tenia de la consulta anterior */
            abilities.forEach(ability => {
            const abilityElement = document.createElement("div");
            const abilityElementName = document.createElement("div");
            abilityElementName.textContent = ability.ability.name;
            abilityElement.appendChild(abilityElementName);
            pokeAbilities.appendChild(abilityElement);
        });
}

const renderPokemonStats = stats => {
        pokeStats.innerHTML = ''; /**Borra lo que tenia de la consulta anterior */
        stats.forEach(stat => {
            const statElement = document.createElement("div");
            const statElementName = document.createElement("div");
            statElementName.textContent = stat.stat.name; 
            statElement.appendChild(statElementName);
            pokeStats.appendChild(statElement);
        });
}

const renderPokemonStatsNumber = stats => {
    pokeStatsNumber.innerHTML = ''; /**Borra lo que tenia de la consulta anterior */
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementAmount);
        pokeStatsNumber.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeNamec.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './imagen/LUTX.gif');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeAbilities.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

    


