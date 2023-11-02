import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import PokedexApi from '../services/PokedexApi'
import { FAB, Portal, Text } from 'react-native-paper'
import Types from '../components/Home/Types';
import { CapitalizeWord } from '../components/Home/CapitalyzeWord';
import { Fab } from '../components/Home/loopRepete';
import { Circle, Star } from '../components/Home/StateAlter';
import * as Animatable from 'react-native-animatable';

export default function HomeScreen({ props, navigation }) {
    const [pokemons, setPokemons] = useState([]);
    const [pokemonVerify, setPokemonVerify] = useState(false)
    const [state, setState] = useState({ open: false });

    async function loadData() {
        await PokedexApi.get('/pokemon?limit=100').then(response => {
            let pokemonList = response.data.results

            pokemonList.map((item, i) => {
                item.id = i + 1
                return item
            })
            setPokemons(pokemonList)
            setPokemonVerify(true)
        })
    }

    useEffect(() => {

        loadData()

    }, [])

    function getColor() {
        let novaLista = pokemons

        novaLista.map((item) => {
            PokedexApi.get('/pokemon-species/' + item.id + '/').then(response => {
                item.color = response.data.color.name
                return item.color
            })
            setPokemons(novaLista)
        })
    }

    useEffect(() => {
        getColor()
        console.log(getColor())
    }, [pokemonVerify])

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    return (
        <View style={styles.Container}>
            <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
            <FlatList
                contentContainerStyle={styles.Flat}
                showsVerticalScrollIndicator={false}
                data={pokemons}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (

                        <Animatable.View key={item.id}
                        style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            borderWidth: 1, borderRadius: 15, borderColor: '#00918F',
                            paddingLeft: 10,
                            // backgroundColor: item.color ? item.color : 'transparent',
                            backgroundColor: 'transparent',
                            height: 80
                        }}
                            animation='bounce'
                            useNativeDriver
                            duration={1000}
                        >

                            <View key={item.id} style={styles.containerInfos}>
                                <View style={{ alignItems: 'center', gap: 10, width: '100%' }}>
                                    <View style={[styles.containerName]}>
                                        <View style={styles.Equal}>
                                            <Text style={styles.textInside}># {item.id}</Text>
                                            <Text style={styles.textInside}>{CapitalizeWord(item.name)}</Text>
                                        </View>
                                        <View style={[styles.Equal]}>
                                            <Star />
                                            <Circle />
                                        </View>
                                    </View>
                                    <Types id={item.id} />
                                </View>
                            </View>
                            <View style={styles.Image}>
                                <Image source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + item.id + '.png' }} style={{ width: '100%', height: '100%', padding: 2 }} />
                            </View>
                        </Animatable.View>

                )}
            />

            < Portal >
                <FAB.Group
                    fabStyle={{ backgroundColor: '#00918F', borderRadius: 50 }} rippleColor='#00918F' color='white'
                    open={open}
                    visible
                    backdropColor='transparent'

                    icon={open ? (
                        icon = 'close'
                    ) : (
                        ({ size, color }) => (
                            <Image
                                source={require('../assets/logoPokedex.png')}
                                style={{ width: size, height: size, tintColor: color }}
                            />)

                    )}
                    actions={Fab}
                    onStateChange={onStateChange}
                />
            </Portal >
        </View >
    );
}

const styles = StyleSheet.create({
    Container: {
        // flex: 1,
        maxWidth: '100%',
        padding: 10,
    },

    Flat: {
        gap: 10
    },

    containerMap: {
        flexDirection: 'row', justifyContent: 'space-between',
        borderWidth: 1, borderRadius: 15, borderColor: 'black',
        paddingLeft: 10,
        height: 80
    },

    containerInfos: {
        flex: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        maxWidth: '75%',
        paddingVertical: 10,
    },

    Equal: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10
    },

    containerName: {
        width: '100%',
        flexDirection: 'row', justifyContent: 'space-between'
    },

    textInside: {
        fontSize: 20, fontWeight: '500', color: '#00918F'
    },

    Image: {
        width: '25%',
        marginLeft: 6,
        alignItems: 'center', justifyContent: 'center',
        borderLeftWidth: 2, borderTopLeftRadius: 40, borderBottomLeftRadius: 40, borderColor: '#00918F'
    },

    labelInside: {
        backgroundColor: '#00918F',
        padding: 5,
        fontSize: 17, fontWeight: '600',
        borderRadius: 5, borderWidth: 1,
    }

})

{/* <TouchableHighlight onPress={() => { navigation.navigate('TelaInformacao', item.id) }}>
</TouchableHighlight> */}