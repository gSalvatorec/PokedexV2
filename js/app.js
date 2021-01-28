window.onload = function() {
    Particles.init({
      selector: '.background',
      color:'#fff',
      connectParticles:false
    });
  };

  //Pokedex trayendo contenido

  //Variable pa meter la imagen
  const buscador=document.querySelector("#search");
  const pokeIMG=document.querySelector('.pokemon-image'),
   imgpoke=document.createElement('img'),
   especie=document.querySelector('.especie'),
   nombre=document.querySelector('.nombre'),
    altura=document.querySelector('.height'),
    anchura=document.querySelector('.weight'),
    evol=document.querySelector('.evolucion'),
    biologia=document.querySelector('.biology');

    async function obtenerPokemon(){
        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/snorlax`)
        .then(lista=>{
             return lista.json();
            
        }).then(datosPokemon=>{
            // console.log(datosPokemon);
            const {sprites,species,name,height,weight}=datosPokemon;
            // console.log(sprites);
            imgpoke.src=sprites.front_default;
            pokeIMG.appendChild(imgpoke);
                fetch(species.url)
                .then(especie=>{
                    return especie.json();
                }).then(pokeEspecie=>{
                    // console.log(pokeEspecie);
                    const {genera,evolution_chain,flavor_text_entries}=pokeEspecie;
                    // console.log(genera);
                    // console.log(flavor_text_entries);
                    flavor_text_entries.forEach(texto=>{
                        // console.log(texto);
                        const{language,flavor_text}=texto;
                        if(language.name==="es"){
                            // console.log(flavor_text);
                            biologia.textContent=flavor_text;
                        }
                    })
                    genera.forEach(genero => {
                        // console.log(genero);
                        const {language,genus}=genero;
                        if(language.name==="es"){
                            especie.textContent=genus;
                        }
                    });
                    // console.log(evolution_chain);
                    fetch(evolution_chain.url)
                        .then(evol=>{
                            return evol.json();
                        }).then(evolution=>{
                            console.log(evolution);
                            const {chain}=evolution;
                            // console.log(chain.evolves_to);
                            chain.evolves_to.forEach(evolves => {
                                const {species}=evolves;
                                evol.textContent=species.name;
                            });
                            
                        })
                    nombre.textContent=name;
                    altura.textContent=height;
                    anchura.textContent=weight;
                    buscador.value=name;
                })
        })
    
    }
    
  obtenerPokemon();
