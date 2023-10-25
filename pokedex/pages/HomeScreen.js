import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import PokedexApi from '../services/PokedexApi'
import { Card, Text } from 'react-native-paper'
import Types from '../components/Types';

export default function HomeScreen(props) {
    const [pokemons, setPokemons] = useState([]);
    const [type, setType] = useState([])
    const [id, setId] = useState([])

    useEffect(() => {
        PokedexApi.get('/pokemon?limit=2').then(response => {
            let pokemonList = response.data.results
            pokemonList.map((item, i) => {
                item.id = i + 1
                setId(item.id)
                return item
            })
            setPokemons(pokemonList)
            // console.log(pokemonList)
        })
    }, [])

    useEffect(() => {
        PokedexApi.get('/pokemon/' + id + '/').then(response => {
            let pokemonType = response.data
            setType(pokemonType)
        })
    }, [])

    return (
        <View style={styles.Container}>
            <FlatList
                style={styles.Flat}
                contentContainerStyle={styles.Flat}
                showsVerticalScrollIndicator={false}
                data={pokemons}
                keyExtractor={item => String(item.id)}
                renderItem={({ item, i }) => (
                    // <></>
                    // <Card key={item.id} mode='outlined' style={{ marginBottom: 10, flex: 1, borderRadius: 5 }} onPress={() => { props.navigation.navigate('TelaInformacao', item.id)}} >
                    //     <Card.Cover style={{ width: '100%', height: 100, resizeMode: 'stretch', borderRadius: 5, padding: 2 }} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + item.id + '.png' }} />
                    //     <Card.Title title={item.name}/>
                    //     <Card.Content>

                    //     <Types id={item.id}/>
                    //     </Card.Content>
                    // </Card>
                    <View key={i} style={styles.containerMap}>
                        <View style={{flex: 4, width: '70%'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text># {item.id}</Text>
                                <Text>{item.name}</Text>
                            </View>
                        </View>
                        <Image source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + item.id + '.png' }} style={{flex: 1, width: '80%', height: 100, resizeMode: 'stretch', borderRadius: 5, padding: 2 }} />
                    </View>

                )}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    Container: {
        // flex: 1,
        maxWidth: '100%',
        padding: 10,
        backgroundColor: '#FFFFFF'
    },

    Flat: {
        backgroundColor: 'white',
        gap: 10
    },

    containerMap: {
        flexDirection: 'row', justifyContent: 'space-between',
        borderWidth: 1, borderRadius: 15, borderColor: 'black',
        paddingLeft: 10,
        backgroundColor: 'white'
    }

})

// subtitle={type.types.name[0, 1]}