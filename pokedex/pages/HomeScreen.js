import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PokedexApi from '../services/PokedexApi'
import { Card, Text } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'

export default function HomeScreen(props) {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        PokedexApi.get('/pokemon?limit=10').then(response => {
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
                style={styles.list}
                data={pokemons}
                keyExtractor={item => String(item.id)}
                renderItem={({ item, index }) => (
                    // <></>
                    <Card mode='outlined' style={{ marginBottom: 10 }} onPress={() => { props.navigation.navigate('TelaInformacao', (index + 1)) }}>
                        <Card.Cover style={{ resizeMode: 'stretch' }} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (index + 1) + '.png' }} />
                        <Card.Title title={item.name} />
                        {/* <Card.Title title={index} /> */}
                    </Card>
                )}

            />
            {/* {pokemons.map((item, i) => (
                <Card mode='outlined' style={{ marginBottom: 10 }} onPress={() => { props.navigation.navigate('TelaInformacao', (i + 1)) }}>
                    <Card.Cover style={{ resizeMode: 'stretch' }} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (i + 1) + '.png' }} />
                    <Card.Title title={item.name} />
                </Card>
            ))} */}
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        maxWidth: '100%',
        padding: 10,
        backgroundColor: '#FFFFFF'

    }
})