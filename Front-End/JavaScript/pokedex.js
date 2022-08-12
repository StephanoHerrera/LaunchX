const fetchPokemon = (url) => { 
    fetch(url).then((res) => {
        if( res.status != "200"){
            console.log( res );

        }else{
            console.log(res);
            return res.json();
        }
        
    }).then(
        (data) => { 
            pokeImage(data.sprites.front_default);
            pokeDetails(data.forms[0].name );
         }

    ) 
 }

 //fetchPokemon('https://pokeapi.co/api/v2/pokemon/ditto');

 const imprimir = () => 
{
    const pokeName= document.getElementById('pokeName');
    console.log(pokeName.value)
    fetchPokemon('https://pokeapi.co/api/v2/pokemon/' + pokeName.value.toLowerCase() );
}

const pokeImage = (url) => { 
    document.getElementById('pokeImage').src= url;
 }

 const pokeDetails= (data) => { 
    const details= document.getElementById('pokeDetails');
    //details.value = 'Este es el contenido para el pokemon ' + data + ' Espero te sirva ';
    details.innerHTML= 'Este es el pokémon ' + data +  '.';
  }