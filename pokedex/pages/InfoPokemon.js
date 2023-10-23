import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PokedexApi from '../services/PokedexApi'
import { Card, Text } from 'react-native-paper'

export default function InfoPokemon(props) {
    const [pokemon, setPokemon] = useState([])

    const id = props.route.params

    useEffect(() => {

        PokedexApi.get('/pokemon/' + id + '/').then(response => {
            setPokemon(response.data)
        })

    }, [])

    return (
        <View style={styles.Container}>
            <Card mode='elevated'>
                <Card.Title title={pokemon.name} />
                {/* <Text>{pokemon.sprites[4]}</Text> */}
                <Card.Cover style={{ width: '100%', }}total={20} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png' }} />
                
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        padding: 10
    }
})