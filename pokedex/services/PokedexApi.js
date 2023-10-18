import axios from 'axios';

const PokedexApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
});

export default PokedexApi;