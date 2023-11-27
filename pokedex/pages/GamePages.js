// screens/GamePages.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PokedexApi from '../services/PokedexApi';
import GameBoard from '../components/jogo/GameBoard';

const getPokemons = async () => {
  try {
    const response = await PokedexApi.get('/pokemon?limit=4'); // Você pode ajustar o limite conforme necessário
    const pokemons = response.data.results;
    
    // Adicione mais detalhes do pokémon, se necessário, fazendo chamadas adicionais para a API
    
    return pokemons;
  } catch (error) {
    console.error('Erro ao obter dados dos pokémons:', error);
    return [];
  }
};

const GamePages = () => {
  const [pokemons, setPokemons] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await getPokemons();
      setPokemons(data);
    };

    fetchPokemons();
  }, []);

  const handleCardPress = (index) => {
    // Se a carta já foi virada, não faz nada
    if (flippedCards.includes(index)) {
      return;
    }

    // Vira a carta
    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    // Se duas cartas estiverem viradas, verifica se são iguais após um curto intervalo
    if (newFlippedCards.length === 2) {
      setTimeout(() => {
        const [firstIndex, secondIndex] = newFlippedCards;

        // Verifica se as cartas são iguais
        if (pokemons[firstIndex].name === pokemons[secondIndex].name) {
          // Se são iguais, mantém as cartas viradas
          setFlippedCards([]);
        } else {
          // Se não são iguais, desvira as cartas
          setFlippedCards([]);
        }
      }, 1000); // Intervalo de 1 segundo para exibir as cartas viradas antes de verificar
    }
  };

  return (
    <View style={styles.container}>
      <GameBoard pokemons={pokemons} onCardPress={handleCardPress} flippedCards={flippedCards} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GamePages;
