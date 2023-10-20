import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PokedexApi from '../services/PokedexApi'
import { Card, Text } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'

export default function HomeScreen(props) {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        PokedexApi.get('/pokemon?limit=2000').then(response => {
            let pokemonList = response.data.results
            pokemonList.map((item, i) => {
                item.id = i + 1
                return item
            })
            setPokemons(pokemonList)
            console.log(pokemonList)
        })
    }, [])

    // const Test = () => {
    //     var endPoints = []
    //     for (var i = 1; i < 2000; i++) {
    //         endPoints.push(PokedexApi + '/pokemon/' + i + '/')
    //     }
    //     console.log(endPoints)
    // }

    return (
        <View style={styles.Container}>
            <FlatList
                // style={styles.list}
                numColumns={3}
                data={pokemons}
                keyExtractor={item => String(item.id)}
                columnWrapperStyle={{gap: 10, width: '100%', justifyContent: 'space-between'}}
                renderItem={({ item, index }) => (
                    // <></>
                    <Card mode='outlined' style={{marginBottom: 10, flex: 1, borderRadius: 5 }} onPress={() => { props.navigation.navigate('TelaInformacao', (index + 1)) }}>
                         <Card.Cover style={{ width: '100%', height: 100, resizeMode: 'stretch', borderRadius: 5, padding: 4 }}  source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (index + 1) + '.png' }} />
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
        flex: 1,
        maxWidth: '100%',
        padding: 10,
        backgroundColor: '#FFFFFF'

    }
})