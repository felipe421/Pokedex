// components/jogo/Card.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const pokemonImages = {
  1: require('../../assets/pokemon_images/1.png'),
  2: require('../../assets/pokemon_images/2.png'),
  3: require('../../assets/pokemon_images/3.png'),
  4: require('../../assets/pokemon_images/4.png'),
  5: require('../../assets/pokemon_images/5.png'),
};

export default function Card({ pokemon, onPress, isFlipped, isMatched }) {
  return (
    <View>
      <TouchableOpacity
        style={[styles.card, isFlipped && styles.flipped, isMatched && styles.matched]}
        onPress={() => onPress(pokemon.id - 1)}
        disabled={isFlipped || isMatched}
      >
        {isFlipped || isMatched ? (
          <Image source={pokemonImages[pokemon.id]} style={{ width: 50, height: 50, padding: 2 }} />
        ) : (
          <Text style={styles.text}>?</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 120,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  flipped: {
    backgroundColor: 'lightgreen',
  },
  matched: {
    opacity: 0,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

