// screens/GamePages.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, Image, TouchableOpacity } from 'react-native';
import GameBoard from '../components/jogo/GameBoard';

const getPokemons = () => {
  const pokemons = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    name: `Pokemon ${index + 1}`,
    isFlipped: false,
    isMatched: false,
  }));

  const duplicatedPokemons = [...pokemons, ...pokemons];
  const shuffledPokemons = duplicatedPokemons.sort(() => Math.random() - 0.5);

  return shuffledPokemons;
};

const GamePages = () => {
  const [pokemons, setPokemons] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [firstFlippedIndex, setFirstFlippedIndex] = useState(null);
  const [showCongratulations, setShowCongratulations] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const data = getPokemons();
    setPokemons(data);
    setFlippedCount(0);
    setFirstFlippedIndex(null);
    setShowCongratulations(false);
  };

  const handleCardPress = (index) => {
    const updatedPokemons = [...pokemons];

    if (updatedPokemons[index].isFlipped || updatedPokemons[index].isMatched) {
      return;
    }

    updatedPokemons[index] = { ...updatedPokemons[index], isFlipped: true };
    setPokemons(updatedPokemons);
    setFlippedCount((prevCount) => prevCount + 1);

    if (flippedCount % 2 === 0) {
      setFirstFlippedIndex(index);
    } else {
      setTimeout(() => {
        if (updatedPokemons[firstFlippedIndex].name === updatedPokemons[index].name) {
          updatedPokemons[firstFlippedIndex] = { ...updatedPokemons[firstFlippedIndex], isMatched: true };
          updatedPokemons[index] = { ...updatedPokemons[index], isMatched: true };
          setPokemons(updatedPokemons);

          // Verifica se todas as cartas foram corretamente viradas
          const isGameFinished = updatedPokemons.every((pokemon) => pokemon.isMatched);
          if (isGameFinished) {
            setShowCongratulations(true);
          }
        } else {
          updatedPokemons[firstFlippedIndex] = { ...updatedPokemons[firstFlippedIndex], isFlipped: false };
          updatedPokemons[index] = { ...updatedPokemons[index], isFlipped: false };
          setPokemons(updatedPokemons);
        }

        setFlippedCount((prevCount) => prevCount + 2);
        setFirstFlippedIndex(null);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={{width: 300, height: 150, resizeMode: 'cover'}} source={require('../assets/pokemon_images/card.png')}/>
      <GameBoard pokemons={pokemons} onCardPress={handleCardPress} />
      

      {showCongratulations && (
        <View style={styles.congratulationsContainer}>
          <Text style={styles.congratulationsText}>PARABÉNS, VOCÊ GANHOU!</Text>
          <TouchableOpacity onPress={resetGame} style={styles.button}><Text>Jogar de novo</Text></TouchableOpacity>
        </View>
      )}
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
  congratulationsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  congratulationsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    padding: 6,
    borderWidth: 2, borderColor: '#FECA05', borderRadius: 10
  }
});

export default GamePages;