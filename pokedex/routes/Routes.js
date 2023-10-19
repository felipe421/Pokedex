import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen.js'
import { StyleSheet } from 'react-native';
import InfoPokemon from '../pages/InfoPokemon.js';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerStyle: styles.backGround, headerTitleStyle: styles.headerTitleStyle}}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerTitle: 'Pokemons'}}/>
                <Stack.Screen name="TelaInformacao" component={InfoPokemon} options={{ headerTitle: 'Notificações', headerLeftLabelVisible: null, }} />
                {/* <Stack.Screen name="StorageAndData" component={StorageAndData} options={{ headerTitle: 'Armazenamento e dados', headerLeftLabelVisible: null }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: '#00918F',  //cor de fundo da barra superior
    },

    headerTitleStyle: {
        color: '#FFFFFF',   //titulo na barra superior
        fontSize: 23
    },
})