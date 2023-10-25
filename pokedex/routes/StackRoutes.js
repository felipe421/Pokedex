import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen.js'
import { StyleSheet } from 'react-native';
import InfoPokemon from '../pages/InfoPokemon.js';

const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        
            <Stack.Navigator initialRouteName='HomeScreen' >
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false }}/>
                <Stack.Screen name="TelaInformacao" component={InfoPokemon} options={{ headerTitle: 'Notificações', headerLeftLabelVisible: null, }} />
                {/* <Stack.Screen name="StorageAndData" component={StorageAndData} options={{ headerTitle: 'Armazenamento e dados', headerLeftLabelVisible: null }} /> */}
            </Stack.Navigator>
        
    )
}

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: '#00918F',
    },

    headerTitleStyle: {
        color: '#FFFFFF',   //titulo na barra superior
        fontSize: 23
    },
})