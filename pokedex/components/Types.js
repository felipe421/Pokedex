import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Text } from 'react-native-paper'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler'
import { ConvertUpperCase } from './CapitalyzeWord'
import defaultColor from './Glabal'

export default function Types(props) {
    const [types, setTypes] = useState([])

    // const ReturnFinal = (props) => {
    //     const idType = props.id
    //     const link = 'https://pokeapi.co/api/v2/pokemon/' + idType + '/'
    //     const tipo = link.types

    //     console.log(tipo)
    //     setTypes(tipo)
    // }


    useEffect(() => {
        const idType = props.id
        const link = 'https://pokeapi.co/api/v2/pokemon/' + idType + '/'
        axios.get(link).then(response => {
            const tipos = response.data.types
            setTypes(tipos)
            // console.log(tipos)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    // console.log(types)



    return (
        <View style={styles.Container}>

            {types.map((item, i) => {
                return (
                    <View key={i} style={[styles.containerText, defaultColor.border]}>
                        <Text style={[styles.textInside, defaultColor.font]}>{ConvertUpperCase(item.type.name)}</Text>
                    </View>
                )
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row', flexWrap: 'nowrap', gap: 10,
        width: '100%'
    },

    containerText: {
        flex: 1, alignItems: 'center',
        padding: 5,
        borderColor: 'black', borderWidth: 1.2, borderRadius: 7
    },

    textInside: {
        fontSize: 15, fontWeight: 'bold'
    }
})