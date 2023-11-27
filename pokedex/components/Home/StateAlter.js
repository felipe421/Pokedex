import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Circle() {

    const [isPressed, setIsPressed] = useState(true);

    return (
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
            {isPressed ? <Ionicons name='ellipse-outline' size={20} color="#00918F" /> : <Ionicons name='ellipse' size={20} color="#00918F" />}
        </TouchableOpacity>
    )
}

export function Star() {

    const [isPressed, setIsPressed] = useState(true);

    return (
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
            {isPressed ? <Ionicons name='star-outline' size={20} color="#00918F" /> : <Ionicons name='star' size={20} color="#00918F" />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})