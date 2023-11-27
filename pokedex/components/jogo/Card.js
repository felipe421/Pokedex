import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';



export default function Card({ pokemon, onPress, flipped }) {
  const looping = [
    0, 1, 2, 3, 4,
  ]
console.log(pokemon)
  return (
    <View>
      <TouchableOpacity style={[styles.card, flipped && styles.flipped]} onPress={() => onPress(pokemon.id)}>
        {flipped ? (
          // <Text style={styles.text}>{pokemon.name}</Text>
            looping.map((item) => (
              < Image source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + item + '.png' }} style={{ width: 50, height: 50, padding: 2 }} />
            ))
        ) : (
        <Text style={styles.text}>?</Text>
    )}
      </TouchableOpacity>
    </View>
  )
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
