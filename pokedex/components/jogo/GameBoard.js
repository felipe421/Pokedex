// components/jogo/GameBoard.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';

const GameBoard = ({ pokemons, onCardPress }) => {
  return (
    <View style={styles.board}>
      {pokemons.map((pokemon, index) => (
        <Card
          key={index}
          pokemon={pokemon}
          onPress={() => onCardPress(index)}
          isFlipped={pokemon.isFlipped}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default GameBoard;