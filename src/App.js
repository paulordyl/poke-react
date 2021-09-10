import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonImgURL, setPokemonImgURL] = useState('');
  const [pokemonAbilities, setPokemonAbilities] = useState([]);

  const getPokemonData = async () => {
    const name = pokemonName.toLowerCase();

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

      if (!response.data) {
        toast.error('Oops, nenhum Pokémon foi encontrado!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      }

      setPokemonImgURL(response.data.sprites.front_default);
      setPokemonAbilities(response.data.abilities);
    } catch (e) {
      toast.error('Oops, nenhum Pokémon foi encontrado!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log(e);
    }
  }

  return (
    <div className="container flex-center">
      <h2>Poké React</h2>

      <small className="text-muted">Digite o nome de um Pokémon para exibir as suas habilidades!</small>

      <div className="search-container col-md-5 col-sm-5">
        <input
          type="text"
          className="form-control"
          id="search_q"
          placeholder="Insira o nome de um Pokémon."
          onChange={ev => {
            setPokemonName(ev.target.value)

            if (!ev.target.value) {
              setPokemonImgURL('');
              setPokemonAbilities([]);
            }
          }}
        />

        <button className="btn-search" id="search-btn" onClick={() => getPokemonData()}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>

      <div className="col-md-5 col-sm-5 pokemon-card" id="pokemon_details">
        <div className="img-container">
          <img 
            id="update_img"
            style={{ width: 200, height: 200 }}
            src={pokemonImgURL ? pokemonImgURL : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'} alt="" srcSet="" 
          />
        </div>
        <div className="detail-container">
          <div className="title-container">
            <h3 className="name text-center" id="update_name">{pokemonName ? pokemonName : '???'}</h3>
            <hr className="seperator" />
            <div className="stats text-center">
              {pokemonAbilities.map((cur_ability, i) => (
                <span key={i} className="cp-text col-md-6" id="update_cp">{cur_ability.ability.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
