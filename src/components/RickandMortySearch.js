import React, {useState} from 'react';
import axios from 'axios';


const RickandMortySearch = () =>{
    const [RickAndMortyName, setRickAndMortyName] = useState('');
    const [RickAndMortyData, setRickAndMortyData] = useState(null);
    
    const [characterImage, setCharacterImage] = useState('');

    const headleInputChange = (e) => {
        setRickAndMortyName(e.target.value)
    }

    const handleSearchClick = async () => {

        try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${RickAndMortyName.toLowerCase()}`)
        const imageUrl = response.data.results[0].image;
        setCharacterImage(imageUrl);
        setRickAndMortyData(response.data);

           if (response.data.results.length >0) {
        
        const [firstResult] = response.data.results;
        setRickAndMortyData(firstResult);
      } else {
        
        console.log('Personaje no encontrado');
        setRickAndMortyData(null);
      }
    } catch (error) {
      console.error('Error al obtener datos del API', error);
    }
    }
    const limpiarCampo = () => {
        setRickAndMortyName('');
        setRickAndMortyData('');
        setCharacterImage('');
      };

return (

    <div >
        <br/>
        <label>
            Search Rick and Morty: 
            <input
            type='text'
            value={RickAndMortyName}
            placeholder='Escribe'
            onChange={headleInputChange}
             ></input>
        </label>
        <button onClick={handleSearchClick}>Buscar</button> <button onClick={limpiarCampo}>Limpiar</button>
        
        {RickAndMortyData && (
            <div>
              <br/>
               <img src={characterImage} alt={"Personaje"}></img>
              <br></br>
                        
                <div className='texto-morty'>  
                <p>Name: {RickAndMortyData.name}</p>
                <p>Status: {RickAndMortyData.status}</p>
                <p>Especie: {RickAndMortyData.species}</p>
                <p>Gender: {RickAndMortyData.gender}</p>
                <p>Origen: {RickAndMortyData.origin.name}</p>
                <p>Location: {RickAndMortyData.location.name}</p>  
                        
                </div>
            </div>   
             
            )}
        <br></br>    
    </div>
)
};
export default RickandMortySearch;





