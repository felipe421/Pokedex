import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PokedexApi from '../services/PokedexApi'

export default function InfoPokemon(props) {
    const [pokemons, setPokemons] = useState([])

    const LinkPokermon = props.route.params

    console.log(pokemons)


    useEffect(() => {

        PokedexApi.get('/pokemon/' + LinkPokermon + '/').then(response => {
            setPokemons(response.data)
        })

    }, [])

  return (
    <View>
      <Text>{pokemons.base_experience}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})