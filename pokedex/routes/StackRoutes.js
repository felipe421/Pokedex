import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen.js'
import { StyleSheet } from 'react-native';
import InfoPokemon from '../pages/InfoPokemon.js';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function StackRoutes({navigation}) {
    return (
        
            <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerStyle: styles.backGround, headerTitleStyle: styles.headerTitleStyle, headerLeftContainerStyle: { paddingLeft: 10 },}}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
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

{/* <Ionicons name='hourglass' color='#A9A9A9' size={10} onPress={() => navigation.openDrawer()}/>} */}