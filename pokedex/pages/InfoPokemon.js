import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PokedexApi from '../services/PokedexApi'
import { Card } from 'react-native-paper'

export default function InfoPokemon(props) {
    const [pokemon, setPokemons] = useState([])

    const id = props.route.params

    useEffect(() => {

        PokedexApi.get('/pokemon/' + id + '/').then(response => {
            setPokemons(response.data)
        })

    }, [])

    return (
        <View style={styles.Container}>
            <Card mode='outlined'>
                <Card.Title title={pokemon.name}/>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        padding: 10
    }
})