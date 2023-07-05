import React, { useEffect, useState } from "react";
import axios from "axios";

function randomIndex() {
    return Math.floor(Math.random() * (5-1) + 1);
}

const Card = () =>{

    const [pokemonId, setPokemonId] = useState(randomIndex());
    const [pokemonsData, setPokemonsData] = useState({});
    

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(res=>{
                setPokemonsData(res.data)
                console.log(pokemonsData);
            })
            .catch(err=> console.error(err));
    },[pokemonId]);

    if(pokemonsData != {}){
        
    }
};

export default Card;