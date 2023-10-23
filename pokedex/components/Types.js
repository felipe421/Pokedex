import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Text } from 'react-native-paper'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler'

export default function Types(props) {
    const [types, setTypes] = useState([])

    // const ReturnFinal = (props) => {
    //     const idType = props.id
    //     const link = 'https://pokeapi.co/api/v2/pokemon/' + idType + '/'
    //     const tipo = link.types

    //     setTypes([tipo])
    // }


    useEffect(() => {
        const idType = props.id
        const link = 'https://pokeapi.co/api/v2/pokemon/' + idType + '/'
        axios.get(link).then(response => {
            const tipos = response.data.types
            setTypes(tipos)
            // console.log(tipos)
        }).catch(error => {
            // console.log(error)
        })
    }, [])

    console.log(types)



    return (
        <View style={{backgroundColor: 'black'}}>
            {types.map((item, i) => {
                <Text key={i}>{item.name}</Text>
            })}

        </View>
    )
}

const styles = StyleSheet.create({})