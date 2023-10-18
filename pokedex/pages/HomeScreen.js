import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PokedexApi from '../services/PokedexApi'
import { Card, Text } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'

export default function HomeScreen(props) {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {

        PokedexApi.get('/pokemon?limit=10').then(response => {
            setPokemons(response.data.results)
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
        <ScrollView style={styles.Container}>
            {/* <FlatList
                showsVerticalScrollIndicator={false}
                data={pokemons}
                renderItem={({ item, i }) => <>
                    <Card  style={{ marginBottom: 10 }}>
                        <Card.Cover source={{ uri:  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (i + 1) + '.png'}} />
                        <Card.Title title={item.name} subtitle="Card Subtitle" />
                        <Card.Content>
                            <Text variant="titleLarge">Card title</Text>
                            <Text variant="bodyMedium">Card content</Text>
                        </Card.Content>
                    </Card>
                    {console.log(i)}
                </>}
            /> */}
            {pokemons.map((item, i) => (
                <Card mode='outlined' style={{ marginBottom: 10 }} onPress={() => { props.navigation.navigate('TelaInformacao', (i + 1)) }}>
                    <Card.Cover style={{ resizeMode: 'stretch' }} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (i + 1) + '.png' }} />
                    <Card.Title title={item.name} />
                </Card>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Container: {
        maxWidth: '100%',
        padding: 10,
        backgroundColor: '#FFFFFF'

    }
})