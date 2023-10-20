import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importe o axios para fazer solicitações à API
import PokedexApi from '../services/PokedexApi';
import { Card, Text } from 'react-native-paper';

export default function HomeScreen(props) {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        PokedexApi.get('/pokemon?limit=10').then(async (response) => {
            const pokemonList = response.data.results;
            const updatedPokemonList = await Promise.all(
                pokemonList.map(async (item, i) => {
                    // Busque as informações de tipo de cada Pokémon
                    const pokemonData = await axios.get(item.url);
                    const types = pokemonData.data.types.map((type) => type.type.name);
                    item.types = types;
                    item.id = i + 1;
                    return item;
                })
            );
            setPokemons(updatedPokemonList);
        });
    }, []);

    async function getPokemonType(id) {
        try {
          const response = await PokedexApi.get('/type/' + id + '/');
          const tipo = response.data
          console.log(tipo.name)
          return tipo.name
       
        } catch (error) {
          console.error(error);
          return null; // retorna null em caso de erro
        }
      }

    return (
        <View style={styles.Container}>
            <FlatList
                style={styles.list}
                data={pokemons}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item, index }) => (
                    <Card mode='outlined' style={{ marginBottom: 10 }} onPress={() => { props.navigation.navigate('TelaInformacao', item.id) }}>
                        <Card.Cover style={{ resizeMode: 'stretch' }} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + item.id + '.png' }} />
                        <Card.Title title={item.name} />
                        {/* <Text>Tipo: {getPokemonType(item.id)}</Text> */}
                    </Card>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        maxWidth: '100%',
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
});
