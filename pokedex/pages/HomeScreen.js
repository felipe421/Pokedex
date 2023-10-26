import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import PokedexApi from '../services/PokedexApi'
import Ionicons from '@expo/vector-icons/Ionicons';
import { FAB, Portal, Text } from 'react-native-paper'
import Types from '../components/Types';
import { CapitalizeWord } from '../components/CapitalyzeWord';

export default function HomeScreen({props, navigation}) {
    const [pokemons, setPokemons] = useState([]);
    const [id, setId] = useState([])
    const [state, setState] = useState({ open: false });
    const [colorList, setColorList] = useState()
    const [isPressed, setIsPressed] = useState(true);

    useEffect(() => {
        PokedexApi.get('/pokemon?limit=10').then(response => {
            let pokemonList = response.data.results
            pokemonList.map((item, i) => {
                item.id = i + 1
                setId(item.id)

                PokedexApi.get('/pokemon-species/' + (i + 1) + '/').then(response => {
                    let listColor = response.data.color
                    setColorList(listColor)
                })

                return item
            })
            setPokemons(pokemonList)
        })
    }, [])

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    console.log(colorList)

    return (
        <View style={styles.Container}>
            <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
            <FlatList
                contentContainerStyle={styles.Flat}
                showsVerticalScrollIndicator={false}
                data={pokemons}
                keyExtractor={item => String(item.id)}
                renderItem={({ item, i }) => (


                    <TouchableHighlight onPress={() => { navigation.navigate('TelaInformacao', item.id) }}>
                        <View key={item.id} style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            borderWidth: 1, borderRadius: 15, borderColor: 'black',
                            paddingLeft: 10,
                            // backgroundColor: colorList.name,
                            height: 80
                        }}>
                            <View style={styles.containerInfos}>
                                <View style={{ alignItems: 'center', gap: 10, width: '100%' }}>
                                    <View style={[styles.containerName]}>
                                        <View style={styles.Equal}>
                                            <Text style={styles.textInside}># {item.id}</Text>
                                            <Text style={styles.textInside}>{CapitalizeWord(item.name)}</Text>
                                        </View>
                                        <View style={[styles.Equal]}>
                                            {isPressed ? <Ionicons name='star-outline' size={20} color="black" /> : <Ionicons name='star' size={20} color="black" />}
                                            <Ionicons name='ellipse-outline' size={20} color="black" />
                                        </View>
                                    </View>
                                    <Types id={item.id} />
                                </View>
                            </View>
                            <View style={styles.Image}>
                                <Image source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + item.id + '.png' }} style={{ width: '100%', height: '100%', padding: 2 }} />
                            </View>
                        </View>
                    </TouchableHighlight>
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
                    actions={[
                        // { icon: 'plus', onPress: () => console.log('Pressed add') },
                        {
                            icon: 'order-alphabetical-ascending',
                            label: 'Ordenar por...',
                            labelStyle: styles.labelInside,
                            onPress: () => console.log('Order A-z'),
                        },
                        {
                            icon: 'filter-outline',
                            label: 'Filtrar por nome',
                            labelStyle: styles.labelInside,
                            onPress: () => console.log('Order Name'),
                        },
                        {
                            icon: 'card-search-outline',
                            label: 'Pesquisar tudo',
                            labelStyle: styles.labelInside,
                            onPress: () => console.log('Search All'),
                        },
                    ]}
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
        fontSize: 20, fontWeight: '500'
    },

    Image: {
        width: '25%',
        marginLeft: 6,
        alignItems: 'center', justifyContent: 'center',
        borderLeftWidth: 2, borderTopLeftRadius: 40, borderBottomLeftRadius: 40
    },

    labelInside: {
        backgroundColor: 'white',
        padding: 5,
        fontSize: 17, fontWeight: '600',
        borderRadius: 5, borderWidth: 1,
    }

})