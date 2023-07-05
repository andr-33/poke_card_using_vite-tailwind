import React, { useEffect, useState } from "react";
import axios from "axios";

function randomIndex() {
    return Math.floor(Math.random() * (150-1) + 1);
}

const Card = () =>{
    const [pokemonId, setPokemonId] = useState(randomIndex());
    const [pokemonCard, setpokemonCard] = useState(null);
    

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(res=>{
                setpokemonCard(res.data)
            })
            .catch(err=> console.error(err));
    },[pokemonId]);

    if(pokemonCard != null){
        return(
            <div>
                <div className="w-80 rounded-2xl overflow-hidden pb-4 shadow-md ">
                    <img className="z-0" src="https://card-poke-simple.netlify.app/images/bg-pattern-card.svg" />
                    <div className="w-full flex justify-center -mt-24">
                        <img id="pokemonImg" className="w-52 h-52 border-black border-2 rounded-full bg-white"  src={pokemonCard.sprites.other.dream_world.front_default} />
                    </div>
                    
                    <p className="text-center mt-6 text-3xl text-gray-400"> 
                        <span className="font-bold text-black">{pokemonCard.name}</span>
                        &#160;{pokemonCard.stats[0].base_stat}hp
                    </p>
                    <p className="text-center mb-6 text-2xl text-gray-400">{pokemonCard.base_experience}&#160;exp</p>
                    <hr/>
                    <div className="flex justify-around mt-8">
                        <div className="flex flex-col">
                            <p className="font-bold">{pokemonCard.stats[1].base_stat}K</p>
                            <p>Ataque</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold">{pokemonCard.stats[3].base_stat}K</p>
                            <p>Ataque Especial</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold">{pokemonCard.stats[2].base_stat}K</p>
                            <p>Defensa</p>
                        </div>
                    </div>
                </div>

                <button className="mt-4 border-0 hover:bg-cyan-400 bg-cyan-500 focus:outline-none hover:scale-110" onClick={()=> setPokemonId(randomIndex())}>Otro pokemon</button>
            </div>
        );
    }
};

export default Card;