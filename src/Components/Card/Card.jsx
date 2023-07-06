import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function randomIndex() {
    return Math.floor(Math.random() * (150-1) + 1);
}

const buildRgb = (imageData) => {
    const rgbValues = [];
    for (let i = 0; i < imageData.length; i += 4) {
        if((imageData[i]+imageData[i+1]+imageData[i+2]) !=0){
            const hexColor = imageData[i].toString(16)+imageData[i + 1].toString(16)+ imageData[i + 2].toString(16);
            rgbValues.push(hexColor);
        }
    }
    const mostFrequent = (arr) =>
        Object.entries(
            arr.reduce((a, v) => {
                a[v] = a[v] ? a[v] + 1 : 1;
                return a;
            }, {})
        ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];
    
    document.body.style.background = `linear-gradient(#${mostFrequent(rgbValues)},  #${mostFrequent(rgbValues)}80)`
};

const Card = () =>{
    const [pokemonId, setPokemonId] = useState(randomIndex());
    const [pokemonCard, setpokemonCard] = useState(null);
    const canvasRef = useRef(null);
    
    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(res=>{
                setpokemonCard(res.data)
                var objImg = new Image();
                objImg.crossOrigin = "anonymous";
                objImg.src = res.data.sprites.other.dream_world.front_default;
            
                objImg.addEventListener("load", ()=>{
                    canvas.width = objImg.width;
                    canvas.height = objImg.height;
                    ctx.drawImage(objImg, 0, 0);
                    const imgData = ctx.getImageData(0, 0, objImg.width, objImg.height);
                    buildRgb(imgData.data);
                })
            })
            .catch(err=> console.error(err));

    },[pokemonId]);

    if(pokemonCard != null){  
        return(
            <div>
                <canvas hidden ref={canvasRef} />
                <div className="w-80 rounded-2xl overflow-hidden pb-4 shadow-md bg-white">
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
    else{
        return(
            <div>
                <canvas hidden ref={canvasRef} />
            </div>
        );
    }
};

export default Card;