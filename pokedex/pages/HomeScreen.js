import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PokedexApi from '../services/PokedexApi'
import { Button, Card, Text } from 'react-native-paper'

export default function HomeScreen() {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {

        PokedexApi.get('/pokemon?limit=2000').then(response => {
            setPokemons(response.data.results)
        })

    }, [])

    const Test = () => {
        var endPoints = []
        for (var i = 1; i < 2000; i++) {
            endPoints.push(PokedexApi + '/pokemon/' + i + '/')
        }
        console.log(endPoints)
    }



    return (
        <View style={styles.Container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={pokemons}
                renderItem={({ item }) => <>
                    <Card style={{ marginBottom: 10 }}>
                        {item.sprites && <Card.Cover source={{ uri: item.sprites.front_default }} />}
                        <Card.Title title={item.name} subtitle="Card Subtitle" />
                        <Card.Content>
                            <Text variant="titleLarge">Card title</Text>
                            <Text variant="bodyMedium">Card content</Text>
                        </Card.Content>
                    </Card>
                </>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10
    }
})